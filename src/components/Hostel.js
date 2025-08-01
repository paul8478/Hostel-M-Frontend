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

  if (allowed === null) return <h2>Loading principal data...</h2>;
  if (!allowed) return <h2 style={{ color: 'red' }}>🚫 You are not allowed!!!</h2>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Welcome, {principal.name}, College ID: {principal.colgid}</h2>

      <h3>Add New Hostel Entry</h3>
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Availability"
          value={newHostel.avail}
          onChange={(e) => setNewHostel({ ...newHostel, avail: e.target.value })}
        />
        <input
          placeholder="Block"
          value={newHostel.block}
          onChange={(e) => setNewHostel({ ...newHostel, block: e.target.value })}
        />
        <input
          placeholder="Room"
          value={newHostel.room}
          onChange={(e) => setNewHostel({ ...newHostel, room: e.target.value })}
        />
        <input
          placeholder="Money"
          value={newHostel.money}
          onChange={(e) => setNewHostel({ ...newHostel, money: e.target.value })}
        />
        <input
          placeholder="Roll Number"
          value={newHostel.rollnumber}
          onChange={(e) => setNewHostel({ ...newHostel, rollnumber: e.target.value })}
        />
        {principal.permission === 'ALL' ? (
          <select
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
          <input type="text" value={principal.colgid} readOnly />
        )}
        <button onClick={handleCreateHostel}>Add Hostel</button>
      </div>

      <h3>Hostel List</h3>
      <ul>
        {hostels
          .filter((hostel) =>
            principal.permission === 'ALL' ? true : hostel.college?.id === principal.colgid
          )
          .map((hostel) => (
            <li key={hostel.id} style={{ marginBottom: '0.5rem' }}>
              {editingHostelId === hostel.id ? (
                <>
                  <input
                    value={editedHostelData.block}
                    onChange={(e) => handleEditChange('block', e.target.value)}
                  /> — 
                  <input
                    value={editedHostelData.room}
                    onChange={(e) => handleEditChange('room', e.target.value)}
                  /> — 
                  <input
                    value={editedHostelData.money}
                    onChange={(e) => handleEditChange('money', e.target.value)}
                  /> — 
                  <input
                    value={editedHostelData.avail}
                    onChange={(e) => handleEditChange('avail', e.target.value)}
                  /> — 
                  <input
                    value={editedHostelData.rollnumber}
                    onChange={(e) => handleEditChange('rollnumber', e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(hostel.id)}>💾 Save</button>
                  <button onClick={handleCancelEdit}>❌ Cancel</button>
                </>
              ) : (
                <>
                  <strong>Block: {hostel.block}</strong> — Room: {hostel.room} — Money: ₹{hostel.money} — Availability: {hostel.avail} — Roll No: {hostel.rollnumber} — College: {hostel.college?.colgname || 'N/A'}
                  <button onClick={() => handleEditClick(hostel)} style={{ marginLeft: '1rem' }}>✏️ Edit</button>
                  <button onClick={() => deleteHostel(hostel.id)} style={{ marginLeft: '0.5rem' }}>🗑 Delete</button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Hostel;
