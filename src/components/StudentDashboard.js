import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hostelAxios from '../api/hostel_axios';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    const storedData = sessionStorage.getItem('principalData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStudent(parsedData);
      if (parsedData.rollnumber) {
        fetchHostel(parsedData.rollnumber);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchHostel = async (rollnumber) => {
    try {
      const res = await hostelAxios.get(`/rollnumber/${rollnumber}`);
      setHostel(res.data);
    } catch (error) {
      console.error('Error fetching hostel data:', error);
      setHostel(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await hostelAxios.post('/admins/logout'); // Optional, if you have logout endpoint
    } catch (err) {
      console.warn('Logout request failed or not required.');
    }
    sessionStorage.clear();
    navigate('/login');
  };

  if (loading) return <h2>Loading student data...</h2>;

  return (
    <div>
      <h2>Student Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right', marginBottom: '1rem' }}>
        🔓 Logout
      </button>

      <h3>Student Information</h3>
      <ul>
        <li><strong>Name:</strong> {student?.name}</li>
        <li><strong>Roll Number:</strong> {student?.rollnumber}</li>
        <li><strong>Email:</strong> {student?.email}</li>
        <li><strong>Address:</strong> {student?.address}</li>
        <li><strong>College:</strong> {student?.college?.colgname}</li>
      </ul>

      <h3>Hostel Information</h3>
      {hostel ? (
        <ul>
          <li><strong>Block:</strong> {hostel.block}</li>
          <li><strong>Room:</strong> {hostel.room}</li>
          <li><strong>Availability:</strong> {hostel.avail ? 'Yes' : 'No'}</li>
          <li><strong>Fees:</strong> ₹{hostel.money}</li>
        </ul>
      ) : (
        <p>No hostel data found for this student.</p>
      )}
    </div>
  );
}
