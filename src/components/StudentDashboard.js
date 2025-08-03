import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hostelAxios from '../api/hostel_axios';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      await hostelAxios.post('/admins/logout');
    } catch (err) {
      console.warn('Logout request failed or not required.');
    }
    sessionStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-secondary">Loading student data...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Header */}
      <div
        className="p-4 rounded shadow mb-5 text-white"
        style={{
          background: 'linear-gradient(to right, #43cea2, #185a9d)',
          position: 'relative',
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">🎓 Welcome, {student?.name}</h2>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light fw-semibold"
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
        <p className="mb-0 small">Logged in as Student</p>
      </div>

      {/* Student Info */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🎓 Roll Number</h5>
              <p className="card-text text-muted">{student?.rollnumber}</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card border-info shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">📧 Email</h5>
              <p className="card-text text-muted">{student?.email}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🏠 Address</h5>
              <p className="card-text text-muted">{student?.address}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card border-warning shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🏫 College</h5>
              <p className="card-text text-muted">{student?.college?.colgname}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5" />

      {/* Hostel Info */}
      <section>
        <h3 className="text-success mb-4">🏢 Hostel Information</h3>

        {hostel ? (
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card border-primary shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">🏢 Block</h5>
                  <p className="card-text text-muted">{hostel.block}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card border-info shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">🚪 Room</h5>
                  <p className="card-text text-muted">{hostel.room}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card border-success shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">📶 Availability</h5>
                  <p className="card-text text-muted">{hostel.avail ? 'Yes ✅' : 'No ❌'}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card border-warning shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">💰 Fees</h5>
                  <p className="card-text text-muted">₹{hostel.money}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted fst-italic">No hostel data found for this student.</p>
        )}
      </section>
    </div>
  );
}
