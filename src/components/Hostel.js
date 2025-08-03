import React, { useEffect, useState } from 'react';
import hostelAxios from '../api/hostel_axios.js';
import collegeAxios from '../api/college_axios';

function Hostel() {
  const [colleges, setColleges] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [newHostel, setNewHostel] = useState({
    avail: '',
    block: '',
    room: '',
    money: '',
    colgid: '',
    rollnumber: ''
  });

  const [principal, setPrincipal] = useState(null);
  const [allowed, setAllowed] = useState(null);
  const [editingHostelId, setEditingHostelId] = useState(null);
  const [editedHostelData, setEditedHostelData] = useState({});

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
      fetchColleges();
      fetchHostels();
    }
  }, [allowed]);

  const fetchColleges = async () => {
    try {
      const res = await collegeAxios.get('');
      if (principal.permission === 'EDIT') {
        const filtered = res.data.filter(col => col.id === principal.colgid);
        setColleges(filtered);
      } else {
        setColleges(res.data);
      }
    } catch (err) {
      console.error('Error fetching colleges:', err);
    }
  };

  const fetchHostels = async () => {
    try {
      const res = await hostelAxios.get('');
      setHostels(res.data);
    } catch (err) {
      console.error('❌ Error fetching hostels:', err);
    }
  };

  const handleCreateHostel = async () => {
    const hostelData = {
      ...newHostel,
      colgid: principal.permission === 'ALL' ? newHostel.colgid : principal.colgid
    };

    const { avail, block, room, money, rollnumber, colgid } = hostelData;

    if (!avail || !block || !room || !money || !rollnumber || !colgid) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await hostelAxios.post('', hostelData);
      setNewHostel({
        avail: '',
        block: '',
        room: '',
        money: '',
        colgid: '',
        rollnumber: ''
      });
      fetchHostels();
    } catch (err) {
      console.error('❌ Error creating hostel:', err);
    }
  };

  const deleteHostel = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hostel entry?')) return;

    try {
      await hostelAxios.delete(`/${id}`);
      fetchHostels();
    } catch (err) {
      console.error('❌ Error deleting hostel:', err);
    }
  };

  const handleEditClick = (hostel) => {
    setEditingHostelId(hostel.id);
    setEditedHostelData({
      block: hostel.block,
      room: hostel.room,
      money: hostel.money,
      avail: hostel.avail,
      rollnumber: hostel.rollnumber
    });
  };

  const handleEditChange = (field, value) => {
    setEditedHostelData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async (id) => {
    try {
      await hostelAxios.put(`/${id}`, {
        ...editedHostelData,
        colgid: principal.colgid
      });
      setEditingHostelId(null);
      setEditedHostelData({});
      fetchHostels();
    } catch (err) {
      console.error('❌ Error updating hostel:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingHostelId(null);
    setEditedHostelData({});
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

      {/* Add New Hostel Entry Form */}
      <section className="mb-5">
        <h3 className="mb-4 text-success">🏠 Add New Hostel Entry</h3>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Availability"
              value={newHostel.avail}
              onChange={(e) => setNewHostel({ ...newHostel, avail: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Block"
              value={newHostel.block}
              onChange={(e) => setNewHostel({ ...newHostel, block: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Room"
              value={newHostel.room}
              onChange={(e) => setNewHostel({ ...newHostel, room: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Money"
              value={newHostel.money}
              onChange={(e) => setNewHostel({ ...newHostel, money: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Roll Number"
              value={newHostel.rollnumber}
              onChange={(e) => setNewHostel({ ...newHostel, rollnumber: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            {principal.permission === 'ALL' ? (
              <select
                className="form-control"
                value={newHostel.colgid}
                onChange={(e) => setNewHostel({ ...newHostel, colgid: e.target.value })}
              >
                <option value="">Select College</option>
                {colleges.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.colgname}
                  </option>
                ))}
              </select>
            ) : (
              <input 
                type="text" 
                className="form-control" 
                value={principal.colgid} 
                readOnly 
                style={{ backgroundColor: '#f8f9fa' }}
              />
            )}
          </div>
          <div className="col-12">
            <button className="btn btn-primary" onClick={handleCreateHostel}>
              Add Hostel Entry
            </button>
          </div>
        </div>
      </section>

      {/* Hostel List */}
      <section>
        <h3 className="mb-4 text-success">🏠 Hostel List</h3>
        {hostels.filter((hostel) =>
          principal.permission === 'ALL' ? true : hostel.college?.id === principal.colgid
        ).length === 0 ? (
          <p className="text-muted fst-italic">No hostel entries found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Block</th>
                  <th>Room</th>
                  <th>Money</th>
                  <th>Availability</th>
                  <th>Roll Number</th>
                  <th>College</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hostels
                  .filter((hostel) =>
                    principal.permission === 'ALL' ? true : hostel.college?.id === principal.colgid
                  )
                  .map((hostel) => (
                    <tr key={hostel.id}>
                      {editingHostelId === hostel.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editedHostelData.block}
                              onChange={(e) => handleEditChange('block', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editedHostelData.room}
                              onChange={(e) => handleEditChange('room', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={editedHostelData.money}
                              onChange={(e) => handleEditChange('money', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editedHostelData.avail}
                              onChange={(e) => handleEditChange('avail', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editedHostelData.rollnumber}
                              onChange={(e) => handleEditChange('rollnumber', e.target.value)}
                            />
                          </td>
                          <td><em>{hostel.college?.colgname || 'N/A'}</em></td>
                          <td>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleSaveEdit(hostel.id)}
                              title="Save Changes"
                            >
                              💾
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={handleCancelEdit}
                              title="Cancel Edit"
                            >
                              ❌
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td><strong>{hostel.block}</strong></td>
                          <td>{hostel.room}</td>
                          <td>₹{hostel.money}</td>
                          <td>{hostel.avail}</td>
                          <td>{hostel.rollnumber}</td>
                          <td><em>{hostel.college?.colgname || 'N/A'}</em></td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => handleEditClick(hostel)}
                              title="Edit Hostel Entry"
                            >
                              ✏️
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteHostel(hostel.id)}
                              title="Delete Hostel Entry"
                            >
                              ❌
                            </button>
                          </td>
                        </>
                      )}
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

export default Hostel;