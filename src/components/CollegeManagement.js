import React, { useEffect, useState } from 'react';

function CollegeManagement() {
  const [colleges, setColleges] = useState([]);
  const [newCollege, setNewCollege] = useState({ colgname: '', address: '' });
  const [permissionAllowed, setPermissionAllowed] = useState(null);
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    // Simulate session data for demo
    const mockPrincipalData = {
      name: "Admin User",
      permission: "ALL",
      colgid: 1
    };
    setPrincipal(mockPrincipalData);
    setPermissionAllowed(true);
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      // Simulated API call - replace with actual collegeAxios.get('')
      const mockData = [
        { id: 1, colgname: "Tech University", address: "123 Main St, Tech City" },
        { id: 2, colgname: "Science College", address: "456 Oak Ave, Science Town" },
        { id: 3, colgname: "Arts Institute", address: "789 Pine Rd, Art District" }
      ];
      setColleges(mockData);
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
      // Simulated API call - replace with actual collegeAxios.post('', newCollege)
      const newId = colleges.length > 0 ? Math.max(...colleges.map(c => c.id)) + 1 : 1;
      const createdCollege = { ...newCollege, id: newId };
      setColleges(prev => [...prev, createdCollege]);
      setNewCollege({ colgname: '', address: '' });
    } catch (err) {
      console.error('❌ Error creating college:', err);
    }
  };

  const deleteCollege = async (id) => {
    if (!window.confirm('Are you sure you want to delete this college?')) return;

    try {
      // Simulated API call - replace with actual collegeAxios.delete(`/${id}`)
      setColleges(prev => prev.filter(college => college.id !== id));
    } catch (err) {
      console.error('❌ Error deleting college:', err);
    }
  };

  if (permissionAllowed === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-secondary">Loading permission data...</h2>
      </div>
    );
  }

  if (!permissionAllowed) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-danger">⛔ Access Denied</h2>
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
        <p className="mb-0">College Management System</p>
      </div>

      {/* Add New College Form */}
      <section className="mb-5">
        <h3 className="mb-4 text-success">🏫 Add New College</h3>
        <div className="row g-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="College Name"
              value={newCollege.colgname}
              onChange={(e) => setNewCollege({ ...newCollege, colgname: e.target.value })}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={newCollege.address}
              onChange={(e) => setNewCollege({ ...newCollege, address: e.target.value })}
            />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <button className="btn btn-primary w-100" onClick={handleCreateCollege}>
              Add College
            </button>
          </div>
        </div>
      </section>

      {/* College List */}
      <section>
        <h3 className="mb-4 text-success">🏫 College List</h3>
        {colleges.length === 0 ? (
          <p className="text-muted fst-italic">No colleges found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>College Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college) => (
                  <tr key={college.id}>
                    <td><strong>{college.colgname}</strong></td>
                    <td>{college.address}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteCollege(college.id)}
                        title="Delete College"
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

export default CollegeManagement;