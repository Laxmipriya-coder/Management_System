
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const roles = [
        {
            value: "admin",
            title: "Admin",
            description: "Manage system and users",
            icon: "bi-person-gear"
        },
        {
            value: "college",
            title: "College",
            description: "Manage college details",
            icon: "bi-bank"
        },
        {
            value: "student",
            title: "Student",
            description: "Access academic details",
            icon: "bi-mortarboard"
        }
    ];

    async function handleLogin(e) {
        e.preventDefault();

        const validationErrors = {};

        if (!role) {
            validationErrors.role = "Please select your role";
        }

        if (!email.trim()) {
            validationErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            validationErrors.email = "Enter a valid email address";
        }

        if (!password) {
            validationErrors.password = "Password is required";
        }

        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password,
                        role: role
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setServerError(
                    data.message || "Invalid email or password"
                );
                return;
            }

            if (!data.user) {
                setServerError(
                    "Login successful, but user information was not received."
                );
                return;
            }

            // Save user information in AuthContext
            login(data.user);

            // Navigate to Dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            setServerError(
                "Unable to connect to the server. Please check whether the backend is running."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-layout">

                {/* Left Side */}
                <section className="login-welcome">
                    <div className="welcome-content">

                        <div className="welcome-brand">
                            <i className="bi bi-mortarboard-fill"></i>

                            <span>
                                College
                                <span className="brand-gold">Portal</span>
                            </span>
                        </div>

                        <span className="welcome-label">
                            WELCOME TO
                        </span>

                        <h1>
                            College
                            <span className="brand-gold">Portal</span>
                        </h1>

                        <h4>
                            Manage Colleges | Track Students | Build a Better Future
                        </h4>

                        <p className="welcome-description">
                            A smart and secure platform for colleges, students,
                            and administrators to manage academic activities
                            and grow together.
                        </p>

                        <div className="welcome-feature">
                            <div className="welcome-feature-icon">
                                <i className="bi bi-bank"></i>
                            </div>

                            <div>
                                <h5>For Colleges</h5>
                                <p>
                                    Manage your institution and student records.
                                </p>
                            </div>
                        </div>

                        <div className="welcome-feature">
                            <div className="welcome-feature-icon blue">
                                <i className="bi bi-person"></i>
                            </div>

                            <div>
                                <h5>For Students</h5>
                                <p>
                                    Access your academic information and updates.
                                </p>
                            </div>
                        </div>

                        <div className="welcome-feature">
                            <div className="welcome-feature-icon green">
                                <i className="bi bi-shield-check"></i>
                            </div>

                            <div>
                                <h5>For Admins</h5>
                                <p>
                                    Control and manage the entire system.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Right Side */}
                <section className="login-form-section">
                    <div className="login-card">

                        <div className="login-card-heading">
                            <i className="bi bi-mortarboard-fill"></i>

                            <h2>Login to Your Account</h2>

                            <p>
                                Please select your role and enter your details
                            </p>
                        </div>

                        <form onSubmit={handleLogin} noValidate>

                            {/* Role Selection */}
                            <label className="form-label fw-semibold">
                                Login As
                            </label>

                            <div className="role-selection">
                                {roles.map((item) => (
                                    <button
                                        type="button"
                                        key={item.value}
                                        className={`role-card ${
                                            role === item.value
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setRole(item.value);

                                            setErrors((prev) => ({
                                                ...prev,
                                                role: ""
                                            }));

                                            setServerError("");
                                        }}
                                    >
                                        <i
                                            className={`bi ${item.icon}`}
                                        ></i>

                                        <strong>{item.title}</strong>

                                        <small>
                                            {item.description}
                                        </small>

                                        {role === item.value && (
                                            <span className="role-check">
                                                <i className="bi bi-check-lg"></i>
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {errors.role && (
                                <div className="text-danger small mb-3">
                                    {errors.role}
                                </div>
                            )}

                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Email Address
                                </label>

                                <div className="login-input">
                                    <i className="bi bi-envelope"></i>

                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);

                                            setErrors((prev) => ({
                                                ...prev,
                                                email: ""
                                            }));

                                            setServerError("");
                                        }}
                                    />
                                </div>

                                {errors.email && (
                                    <div className="text-danger small mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <div className="login-input">
                                    <i className="bi bi-lock"></i>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);

                                            setErrors((prev) => ({
                                                ...prev,
                                                password: ""
                                            }));

                                            setServerError("");
                                        }}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        <i
                                            className={`bi ${
                                                showPassword
                                                    ? "bi-eye-slash"
                                                    : "bi-eye"
                                            }`}
                                        ></i>
                                    </button>
                                </div>

                                {errors.password && (
                                    <div className="text-danger small mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Backend Error */}
                            {serverError && (
                                <div className="alert alert-danger mt-3">
                                    {serverError}
                                </div>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="login-submit-btn"
                                disabled={loading}
                            >
                                <i className="bi bi-arrow-right me-2"></i>

                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </button>

                            <div className="login-divider">
                                <span>OR</span>
                            </div>

                            {/* Secure Login */}
                            <div className="secure-login">
                                <i className="bi bi-shield-check"></i>

                                <div>
                                    <strong>Secure Login</strong>

                                    <p>
                                        Your account information is protected.
                                    </p>
                                </div>
                            </div>

                            {/* Register Link */}
                            <p className="register-prompt">
                                Don't have an account?{" "}
                                <Link to="/register">
                                    Register here
                                </Link>
                            </p>

                        </form>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default Login;
