import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="py-5 text-white position-relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(to right, #43cea2, #185a9d)',
          minHeight: '100vh'
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="display-3 fw-bold mb-4">
                  🏠 Hostel Management System
                </h1>
                <p className="lead mb-4 fs-4">
                  A comprehensive community-driven management platform for modern hostel administration, 
                  student management, and seamless operations.
                </p>
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <span className="badge bg-light text-dark px-3 py-2 fs-6">
                    <i className="fas fa-users me-2"></i>Student Management
                  </span>
                  <span className="badge bg-light text-dark px-3 py-2 fs-6">
                    <i className="fas fa-building me-2"></i>Room Allocation
                  </span>
                  <span className="badge bg-light text-dark px-3 py-2 fs-6">
                    <i className="fas fa-chart-bar me-2"></i>Analytics & Reports
                  </span>
                </div>
                <a
                  href="/login"
                  className="btn btn-light btn-lg px-5 py-3 fw-bold shadow-lg"
                  style={{ borderRadius: '50px' }}
                >
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Get Started
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div 
                  className="bg-white rounded-4 shadow-lg p-5 mx-auto"
                  style={{ maxWidth: '400px', transform: 'rotate(-5deg)' }}
                >
                  <div className="display-1 text-primary mb-3">🎓</div>
                  <h4 className="text-dark mb-3">Welcome Portal</h4>
                  <div className="d-flex justify-content-around text-muted">
                    <div>
                      <div className="h5 text-success">500+</div>
                      <small>Students</small>
                    </div>
                    <div>
                      <div className="h5 text-warning">50+</div>
                      <small>Rooms</small>
                    </div>
                    <div>
                      <div className="h5 text-info">25+</div>
                      <small>Colleges</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-success mb-3">
              🌟 Key Features
            </h2>
            <p className="lead text-muted">
              Everything you need to manage your hostel efficiently
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '80px', 
                    height: '80px',
                    background: 'linear-gradient(to right, #43cea2, #185a9d)'
                  }}
                >
                  <i className="fas fa-user-graduate text-white fs-2"></i>
                </div>
                <h5 className="card-title text-success">👨‍🎓 Student Management</h5>
                <p className="card-text text-muted">
                  Comprehensive student registration, profile management, and academic tracking system.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '80px', 
                    height: '80px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)'
                  }}
                >
                  <i className="fas fa-bed text-white fs-2"></i>
                </div>
                <h5 className="card-title text-success">🏠 Hostel Administration</h5>
                <p className="card-text text-muted">
                  Room allocation, availability tracking, and maintenance management for optimal operations.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '80px', 
                    height: '80px',
                    background: 'linear-gradient(135deg, #f093fb, #f5576c)'
                  }}
                >
                  <i className="fas fa-users-cog text-white fs-2"></i>
                </div>
                <h5 className="card-title text-success">👤 Principal Control</h5>
                <p className="card-text text-muted">
                  Role-based access control with different permission levels for administrators and staff.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '80px', 
                    height: '80px',
                    background: 'linear-gradient(135deg, #11998e, #38ef7d)'
                  }}
                >
                  <i className="fas fa-chart-line text-white fs-2"></i>
                </div>
                <h5 className="card-title text-success">📊 Analytics & Reports</h5>
                <p className="card-text text-muted">
                  Detailed insights, occupancy reports, and data-driven decision making tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-5 text-white"
        style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }}
      >
        <div className="container py-4">
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="p-3">
                <div className="display-3 fw-bold mb-2">500+</div>
                <h5 className="mb-0">Active Students</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="p-3">
                <div className="display-3 fw-bold mb-2">50+</div>
                <h5 className="mb-0">Available Rooms</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="p-3">
                <div className="display-3 fw-bold mb-2">25+</div>
                <h5 className="mb-0">Partner Colleges</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="p-3">
                <div className="display-3 fw-bold mb-2">98%</div>
                <h5 className="mb-0">Satisfaction Rate</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold text-success mb-4">
                🚀 Why Choose Our System?
              </h2>
              <div className="row g-4">
                <div className="col-12">
                  <div className="d-flex">
                    <div 
                      className="rounded-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ 
                        width: '50px', 
                        height: '50px',
                        background: 'linear-gradient(to right, #43cea2, #185a9d)'
                      }}
                    >
                      <i className="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h5 className="mb-2">Easy to Use Interface</h5>
                      <p className="text-muted mb-0">
                        Intuitive design that makes hostel management simple and efficient.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex">
                    <div 
                      className="rounded-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ 
                        width: '50px', 
                        height: '50px',
                        background: 'linear-gradient(to right, #43cea2, #185a9d)'
                      }}
                    >
                      <i className="fas fa-shield-alt text-white"></i>
                    </div>
                    <div>
                      <h5 className="mb-2">Secure & Reliable</h5>
                      <p className="text-muted mb-0">
                        Advanced security measures to protect student and institutional data.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex">
                    <div 
                      className="rounded-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ 
                        width: '50px', 
                        height: '50px',
                        background: 'linear-gradient(to right, #43cea2, #185a9d)'
                      }}
                    >
                      <i className="fas fa-mobile-alt text-white"></i>
                    </div>
                    <div>
                      <h5 className="mb-2">Mobile Responsive</h5>
                      <p className="text-muted mb-0">
                        Access the system anywhere, anytime from any device.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-light rounded-4 p-4 h-100">
                      <div className="display-4 mb-2">📱</div>
                      <h6>Mobile Ready</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded-4 p-4 h-100">
                      <div className="display-4 mb-2">🔒</div>
                      <h6>Secure</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded-4 p-4 h-100">
                      <div className="display-4 mb-2">⚡</div>
                      <h6>Fast</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded-4 p-4 h-100">
                      <div className="display-4 mb-2">💡</div>
                      <h6>Smart</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="mb-0">🏠 Hostel Management System</h5>
              <p className="mb-0 ">Made by Somnath Paul & Monojit Das</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex justify-content-md-end gap-3">
                <a href="#" className="text-white">
                  <i className="fab fa-facebook fs-4"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-twitter fs-4"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-linkedin fs-4"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <div className="text-center">
            <p className="mb-0">
              © 2024 Hostel Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;