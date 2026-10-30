
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6">
              <span className="badge bg-warning text-dark mb-3">
                Welcome to CollegePortal
              </span>

              <h1 className="hero-title">
                Manage Your College
                <span className="text-primary">
                  {" "} Smarter & Easier
                </span>
              </h1>

              <p className="hero-description">
                A simple and smart platform to manage students,
                colleges, and administration in one place.
                Make your college management easier and faster.
              </p>

              <div className="hero-buttons">
                <Link
                  to="/login"
                  className="btn btn-primary btn-lg me-3"
                >
                  Get Started
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-dark btn-lg"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                alt="College Building"
                className="hero-image"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Explore Our Platform
            </h2>

            <p className="text-muted">
              Everything you need to manage your college
            </p>
          </div>

          <div className="row g-4">

            {/* Student Card */}
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon bg-primary">
                  <i className="bi bi-mortarboard-fill"></i>
                </div>

                <h4>Student Portal</h4>

                <p>
                  View student details, academic information,
                  and college updates.
                </p>

                <Link
                  to="/student"
                  className="btn btn-outline-primary"
                >
                  Explore Students
                </Link>
              </div>
            </div>

            {/* College Card */}
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon bg-success">
                  <i className="bi bi-building"></i>
                </div>

                <h4>College Management</h4>

                <p>
                  Manage college information, departments,
                  and institutional records.
                </p>

                <Link
                  to="/college"
                  className="btn btn-outline-success"
                >
                  Explore Colleges
                </Link>
              </div>
            </div>

            {/* Admin Card */}
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon bg-danger">
                  <i className="bi bi-person-gear"></i>
                </div>

                <h4>Admin Dashboard</h4>

                <p>
                  Control users, monitor activities,
                  and manage the entire system.
                </p>

                <Link
                  to="/admin"
                  className="btn btn-outline-danger"
                >
                  Explore Admin
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}

      {/* Professional Footer */}
    </div>
  );
}

export default Home;