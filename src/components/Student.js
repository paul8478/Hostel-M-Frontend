import React, { useEffect, useState } from 'react';
import collegeAxios from '../api/student_axios.js';

function Student() {
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
  const [allowed, setAllowed] = useState(null); // Track permission state

  useEffect(() => {
    const storedData = sessionStorage.getItem('principalData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setPrincipal(parsed);
      if (parsed.permission === 'EDIT' || parsed.permission === 'ALL') {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    } else {
      setAllowed(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) {
      fetchStudents();
    }
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
    const studentData = {
      ...newStudent,
      colgid: principal.colgid
    };

    const { name, address, email, password, rollnumber } = studentData;

    if (!name || !address || !email || !password || !rollnumber) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await collegeAxios.post('', studentData);
      setNewStudent({
        name: '',
        address: '',
        email: '',
        password: '',
        rollnumber: '',
        colgid: ''
      });
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
    return <h2>Loading principal data...</h2>;
  }

  if (!allowed) {
    return <h2 style={{ color: 'red' }}>🚫 You are not allowed!!!</h2>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Welcome, {principal.name}</h2>

      <h3>Add New Student</h3>
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Address"
          value={newStudent.address}
          onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Password"
          type="password"
          value={newStudent.password}
          onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Roll Number"
          value={newStudent.rollnumber}
          onChange={(e) => setNewStudent({ ...newStudent, rollnumber: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input type="hidden" value={principal.colgid} />
        <button onClick={handleCreateStudent}>Add Student</button>
      </div>

      <h3>Student List</h3>
      <ul>
        {students
          .filter((student) => {
            if (principal.permission === 'ALL') return true;
            return student.college?.id === principal.colgid;
          })
          .map((student) => (
            <li key={student.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{student.name}</strong> — {student.email} — {student.rollnumber} — {student.address} — {student.password} - {student.college?.colgname || 'N/A'}
              <button
                style={{ marginLeft: '1rem' }}
                onClick={() => deleteStudent(student.id)}
              >
                ❌ Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Student;
