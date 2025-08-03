import React, { useEffect, useState } from 'react';
import collegeAxios from '../api/student_axios.js';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    address: '',
    email: '',
    password: '',
    rollnumber: '',
    colgid: ''
  });

  const [principal, setPrincipal] = useState(null);
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('principalData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setPrincipal(parsed);
      setAllowed(parsed.permission === 'EDIT' || parsed.permission === 'ALL');
    } else {
      setAllowed(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) fetchStudents();
  }, [allowed]);

  const fetchStudents = async () => {
    try {
      const res = await collegeAxios.get('');
      setStudents(res.data);
    } catch (err) {
      console.error('❌ Error fetching students:', err);
    }
  };

  const handleCreateStudent = async () => {
    const studentData = { ...newStudent, colgid: principal.colgid };
    const { name, address, email, password, rollnumber } = studentData;
    if (!name || !address || !email || !password || !rollnumber) {
      alert('Please fill out all fields.');
      return;
    }
    try {
      await collegeAxios.post('', studentData);
      setNewStudent({ name: '', address: '', email: '', password: '', rollnumber: '', colgid: '' });
      fetchStudents();
    } catch (err) {
      console.error('❌ Error creating student:', err);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await collegeAxios.delete(`/${id}`);
      fetchStudents();
    } catch (err) {
      console.error('❌ Error deleting student:', err);
    }
  };

  if (allowed === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-secondary">Loading principal data...</h2>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-danger">🚫 You are not allowed!!!</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Header */}
      <div
        className="p-4 rounded shadow mb-5 text-white"
        style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }}
      >
        <h2 className="fw-bold">👋 Welcome, {principal.name}</h2>
      </div>

      {/* Add New Student Form */}
      <section className="mb-5">
        <h3 className="mb-4 text-success">➕ Add New Student</h3>
        <div className="row g-3">
          {['name','address','email','password','rollnumber'].map((field, i) => (
            <div className={`col-md-${field==='email'||field==='rollnumber'?4:4}`} key={i}>
              <input
                type={field==='password'?'password':'text'}
                className="form-control"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newStudent[field]}
                onChange={e => setNewStudent({ ...newStudent, [field]: e.target.value })}
              />
            </div>
          ))}
          <div className="col-md-4 d-flex align-items-center">
            <button className="btn btn-primary w-100" onClick={handleCreateStudent}>
              Add Student
            </button>
          </div>
        </div>
      </section>

      {/* Student List */}
      <section>
        <h3 className="mb-4 text-success">🎓 Student List</h3>
        {students.length === 0 ? (
          <p className="text-muted fst-italic">No students found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll Number</th>
                  <th>Address</th>
                  <th>Password</th>
                  <th>College</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter(s => principal.permission === 'ALL' || s.college?.id === principal.colgid)
                  .map(student => (
                    <tr key={student.id}>
                      <td><strong>{student.name}</strong></td>
                      <td>{student.email}</td>
                      <td>{student.rollnumber}</td>
                      <td>{student.address}</td>
                      <td>{student.password}</td>
                      <td><em>{student.college?.colgname || 'N/A'}</em></td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteStudent(student.id)}
                          title="Delete Student"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
