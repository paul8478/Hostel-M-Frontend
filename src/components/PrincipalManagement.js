import React, { useEffect, useState } from 'react';
import collegeAxios from '../api/college_axios';
import principalAxios from '../api/principal_axios'; // 🔁 You need to create this file

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

  useEffect(() => {
    fetchColleges();
    fetchPrincipals();

  }, [colleges]);

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

  return (
    <div style={{ padding: '1rem' }}>
      <h3>👤 Principal Management</h3>

      {/* Form */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Name"
          value={newPrincipal.name}
          onChange={(e) => setNewPrincipal({ ...newPrincipal, name: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Email"
          value={newPrincipal.email}
          onChange={(e) => setNewPrincipal({ ...newPrincipal, email: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Password"
          type="password"
          value={newPrincipal.password}
          onChange={(e) => setNewPrincipal({ ...newPrincipal, password: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <select
          value={newPrincipal.permission}
          onChange={(e) => setNewPrincipal({ ...newPrincipal, permission: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        >
          <option value="VIEW_ONLY">VIEW_ONLY</option>
          <option value="EDIT">EDIT</option>
          <option value="ALL">ALL</option>
        </select>
        <select
          value={newPrincipal.colgid}
          onChange={(e) => setNewPrincipal({ ...newPrincipal, colgid: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        >
          <option value="">Select College</option>
          {colleges.map((col) => (
            <option key={col.id} value={col.id}>
              {col.colgname}
            </option>
          ))}
        </select>
        <button onClick={handleCreatePrincipal}>Add Principal</button>
      </div>

      {/* List */}
      <ul>
        {principals.length === 0 ? (
          <li>No principals found.</li>
        ) : (
          principals.map((p) => (
            <li key={p.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{p.name}</strong> ({p.email}) — {p.permission} —{' '}
              <em>{p.college?.colgname || 'Unknown College'}</em>
              <button
                style={{ marginLeft: '1rem' }}
                onClick={() => deletePrincipal(p.id)}
              >
                ❌ Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default PrincipalManagement;
