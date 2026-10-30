
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setLoading(true);
                setError("");

                const [studentRes, collegeRes, userRes] =
                    await Promise.all([
                        fetch("http://localhost:5000/api/students"),
                        fetch("http://localhost:5000/api/colleges"),
                        fetch("http://localhost:5000/api/users")
                    ]);

                if (
                    !studentRes.ok ||
                    !collegeRes.ok ||
                    !userRes.ok
                ) {
                    throw new Error("Unable to fetch dashboard data");
                }

                const studentData = await studentRes.json();
                const collegeData = await collegeRes.json();
                const userData = await userRes.json();

                setStudents(
                    Array.isArray(studentData)
                        ? studentData
                        : studentData.students || []
                );

                setColleges(
                    Array.isArray(collegeData)
                        ? collegeData
                        : collegeData.colleges || []
                );

                setUsers(
                    Array.isArray(userData)
                        ? userData
                        : userData.users || []
                );
            } catch (err) {
                console.error("Dashboard error:", err);
                setError(
                    "Could not load dashboard data. Please check your backend API routes."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    const dashboardCards = [
        {
            title: "Total Students",
            count: students.length,
            icon: "bi-mortarboard-fill",
            color: "students",
            link: "/student"
        },
        {
            title: "Total Colleges",
            count: colleges.length,
            icon: "bi-bank2",
            color: "colleges",
            link: "/college"
        },
        {
            title: "Total Users",
            count: users.length,
            icon: "bi-people-fill",
            color: "users",
            link: "/users"
        }
    ];

    return (
        <div className="dashboard-page">
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <div>
                    <span className="dashboard-label">
                        OVERVIEW
                    </span>

                    <h1>Dashboard</h1>

                    <p>
                        Welcome to your College Management System.
                        Manage students, colleges, and users from one place.
                    </p>
                </div>

                <div className="dashboard-header-icon">
                    <i className="bi bi-grid-1x2-fill"></i>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="dashboard-message">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p>Loading dashboard...</p>
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="alert alert-warning">
                    {error}
                </div>
            )}

            {/* Dashboard Cards */}
            {!loading && !error && (
                <>
                    <div className="dashboard-stats">
                        {dashboardCards.map((card) => (
                            <div
                                className="dashboard-stat-card"
                                key={card.title}
                            >
                                <div className="stat-card-top">
                                    <div>
                                        <p>{card.title}</p>

                                        <h2>{card.count}</h2>
                                    </div>

                                    <div
                                        className={`stat-icon ${card.color}`}
                                    >
                                        <i
                                            className={`bi ${card.icon}`}
                                        ></i>
                                    </div>
                                </div>

                                <Link
                                    to={card.link}
                                    className="stat-card-link"
                                >
                                    View Details
                                    <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <section className="dashboard-section">
                        <div className="dashboard-section-heading">
                            <div>
                                <h3>Quick Actions</h3>

                                <p>
                                    Manage your college information quickly.
                                </p>
                            </div>
                        </div>

                        <div className="dashboard-actions">
                            <Link
                                to="/student"
                                className="dashboard-action-card"
                            >
                                <div className="action-icon student-action">
                                    <i className="bi bi-person-plus-fill"></i>
                                </div>

                                <div>
                                    <h5>Manage Students</h5>

                                    <p>
                                        Add, edit, and view student records.
                                    </p>
                                </div>

                                <i className="bi bi-arrow-up-right action-arrow"></i>
                            </Link>

                            <Link
                                to="/college"
                                className="dashboard-action-card"
                            >
                                <div className="action-icon college-action">
                                    <i className="bi bi-building"></i>
                                </div>

                                <div>
                                    <h5>Manage Colleges</h5>

                                    <p>
                                        Add and update college information.
                                    </p>
                                </div>

                                <i className="bi bi-arrow-up-right action-arrow"></i>
                            </Link>

                            <Link
                                to="/users"
                                className="dashboard-action-card"
                            >
                                <div className="action-icon user-action">
                                    <i className="bi bi-people-fill"></i>
                                </div>

                                <div>
                                    <h5>Manage Users</h5>

                                    <p>
                                        View and manage registered users.
                                    </p>
                                </div>

                                <i className="bi bi-arrow-up-right action-arrow"></i>
                            </Link>
                        </div>
                    </section>

                    {/* Recent Records */}
                    <section className="dashboard-section">
                        <div className="dashboard-section-heading">
                            <div>
                                <h3>Recent Students</h3>

                                <p>
                                    Recently available student records.
                                </p>
                            </div>

                            <Link
                                to="/student"
                                className="dashboard-view-all"
                            >
                                View All
                            </Link>
                        </div>

                        {students.length === 0 ? (
                            <div className="dashboard-empty">
                                <i className="bi bi-inbox"></i>

                                <p>No student records found.</p>

                                <Link to="/student">
                                    Add your first student
                                </Link>
                            </div>
                        ) : (
                            <div className="dashboard-table-wrapper">
                                <table className="table dashboard-table">
                                    <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>Email</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {students.slice(0, 5).map(
                                            (student, index) => (
                                                <tr
                                                    key={
                                                        student.id ||
                                                        student.student_id ||
                                                        index
                                                    }
                                                >
                                                    <td>
                                                        <div className="student-name-cell">
                                                            <div className="student-avatar">
                                                                {(
                                                                    student.name ||
                                                                    student.full_name ||
                                                                    "S"
                                                                )
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </div>

                                                            <strong>
                                                                {student.name ||
                                                                    student.full_name ||
                                                                    "Student"}
                                                            </strong>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {student.email || "—"}
                                                    </td>

                                                    <td>
                                                        <Link
                                                            to="/student"
                                                            className="student-view-link"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}

export default Dashboard;
