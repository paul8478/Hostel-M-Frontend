import React, { useEffect, useState } from 'react';
import collegeAxios from '../api/college_axios.js';

function CollegeManagement() {
  const [colleges, setColleges] = useState([]);
  const [newCollege, setNewCollege] = useState({ colgname: '', address: '' });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await collegeAxios.get('');
      setColleges(res.data);
    } catch (err) {
      console.error('❌ Error fetching colleges:', err);
    }
  };

  const handleCreateCollege = async () => {
    if (!newCollege.colgname.trim() || !newCollege.address.trim()) {
      alert('Please fill out both college name and address.');
      return;
    }

    try {
      await collegeAxios.post('', newCollege);
      setNewCollege({ colgname: '', address: '' });
      fetchColleges();
    } catch (err) {
      console.error('❌ Error creating college:', err);
    }
  };

  const deleteCollege = async (id) => {
    if (!window.confirm('Are you sure you want to delete this college?')) return;

    try {
      await collegeAxios.delete(`/${id}`);
      fetchColleges();
    } catch (err) {
      console.error('❌ Error deleting college:', err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>

      {/* Add College Form */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="College Name"
          value={newCollege.colgname}
          onChange={(e) => setNewCollege({ ...newCollege, colgname: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Address"
          value={newCollege.address}
          onChange={(e) => setNewCollege({ ...newCollege, address: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleCreateCollege}>Add College</button>
      </div>

      {/* College List */}
      <ul>
        {colleges.length === 0 ? (
          <li>No colleges found.</li>
        ) : (
          colleges.map((college) => (
            <li key={college.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{college.colgname}</strong> — {college.address}
              <button
                style={{ marginLeft: '1rem' }}
                onClick={() => deleteCollege(college.id)}
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

export default CollegeManagement;
