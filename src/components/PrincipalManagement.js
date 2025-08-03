import React, { useEffect, useState } from 'react';
import collegeAxios from '../api/college_axios';
import principalAxios from '../api/principal_axios';

function PrincipalManagement() {
  const [colleges, setColleges] = useState([]);
  const [principals, setPrincipals] = useState([]);
  const [newPrincipal, setNewPrincipal] = useState({
    name: '',
    email: '',
    password: '',
    permission: 'VIEW_ONLY',
    colgid: ''
  });

  const [principal, setPrincipal] = useState(null);
  const [allowed, setAllowed] = useState(null); // null = loading, true = allowed, false = blocked

  useEffect(() => {
    const storedData = sessionStorage.getItem('principalData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setPrincipal(parsed);
      setAllowed(parsed.permission === 'ALL');
    } else {
      setAllowed(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) {
      fetchColleges();
      fetchPrincipals();
    }
  }, [allowed]);

  const fetchColleges = async () => {
    try {
      const res = await collegeAxios.get('');
      setColleges(res.data);
    } catch (err) {
      console.error('Error fetching colleges:', err);
    }
  };

  const fetchPrincipals = async () => {
    try {
      const res = await principalAxios.get('');
      setPrincipals(res.data);
    } catch (err) {
      console.error('Error fetching principals:', err);
    }
  };

  const handleCreatePrincipal = async () => {
    const { name, email, password, colgid } = newPrincipal;
    if (!name || !email || !password || !colgid) {
      alert('Please fill all fields');
      return;
    }

    try {
      await principalAxios.post('', newPrincipal);
      setNewPrincipal({
        name: '',
        email: '',
        password: '',
        permission: 'VIEW_ONLY',
        colgid: ''
      });
      fetchPrincipals();
    } catch (err) {
      console.error('Error creating principal:', err);
    }
  };

  const deletePrincipal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this principal?')) return;

    try {
      await principalAxios.delete(`/${id}`);
      fetchPrincipals();
    } catch (err) {
      console.error('Error deleting principal:', err);
    }
  };

  if (allowed === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-secondary">Loading permission data...</h2>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-danger">🚫 Access denied.</h2>
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
        <h2 className="fw-bold">👋 Welcome, {principal?.name}</h2>
        <p className="mb-0">Permission Level: <strong>{principal?.permission}</strong></p>
      </div>

      {/* Add New Principal Form */}
      <section className="mb-5">
        <h3 className="mb-4 text-success">👤 Add New Principal</h3>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newPrincipal.name}
              onChange={(e) => setNewPrincipal({ ...newPrincipal, name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newPrincipal.email}
              onChange={(e) => setNewPrincipal({ ...newPrincipal, email: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={newPrincipal.password}
              onChange={(e) => setNewPrincipal({ ...newPrincipal, password: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={newPrincipal.permission}
              onChange={(e) => setNewPrincipal({ ...newPrincipal, permission: e.target.value })}
            >
              <option value="VIEW_ONLY">VIEW_ONLY</option>
              <option value="EDIT">EDIT</option>
              <option value="ALL">ALL</option>
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={newPrincipal.colgid}
              onChange={(e) => setNewPrincipal({ ...newPrincipal, colgid: e.target.value })}
            >
              <option value="">Select College</option>
              {colleges.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.colgname}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <button className="btn btn-primary w-100" onClick={handleCreatePrincipal}>
              Add Principal
            </button>
          </div>
        </div>
      </section>

      {/* Principal List */}
      <section>
        <h3 className="mb-4 text-success">👤 Principal List</h3>
        {principals.length === 0 ? (
          <p className="text-muted fst-italic">No principals found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Permission</th>
                  <th>College</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {principals.map((p) => (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.email}</td>
                    <td>
                      <span className={`badge ${
                        p.permission === 'ALL' ? 'bg-success' : 
                        p.permission === 'EDIT' ? 'bg-warning text-dark' : 
                        'bg-secondary'
                      }`}>
                        {p.permission}
                      </span>
                    </td>
                    <td><em>{p.college?.colgname || 'Unknown College'}</em></td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deletePrincipal(p.id)}
                        title="Delete Principal"
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

export default PrincipalManagement;