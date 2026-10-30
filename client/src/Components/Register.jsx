
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

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

    async function handleRegister(e) {
        e.preventDefault();

        let validationErrors = {};

        if (!role) {
            validationErrors.role = "Please select your role";
        }

        if (!name.trim()) {
            validationErrors.name = "Full name is required";
        }

        if (!email.trim()) {
            validationErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = "Enter a valid email address";
        }

        if (!password) {
            validationErrors.password = "Password is required";
        } else if (password.length < 6) {
            validationErrors.password =
                "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword =
                "Please confirm your password";
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword =
                "Passwords do not match";
        }

        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                        password,
                        role
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setServerError(
                    data.message ||
                    "Registration failed. Please try again."
                );
                return;
            }

            alert("Registration successful! Please login.");

            navigate("/login");

        } catch (error) {
            console.error("Registration error:", error);

            setServerError(
                "Unable to connect to the server"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-layout">

                {/* Register Form */}
                <section className="login-form-section">
                    <div className="login-card">

                        {/* Heading */}
                        <div className="login-card-heading">
                            <i className="bi bi-person-plus-fill"></i>

                            <h2>Create Your Account</h2>

                            <p>
                                Select your role and enter your details
                            </p>
                        </div>

                        <form
                            onSubmit={handleRegister}
                            noValidate
                        >

                            {/* Role Selection */}
                            <label className="form-label fw-semibold">
                                Register As
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

                                        <strong>
                                            {item.title}
                                        </strong>

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

                            {/* Full Name */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Full Name
                                </label>

                                <div className="login-input">
                                    <i className="bi bi-person"></i>

                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);

                                            setErrors((prev) => ({
                                                ...prev,
                                                name: ""
                                            }));

                                            setServerError("");
                                        }}
                                    />
                                </div>

                                {errors.name && (
                                    <div className="text-danger small mt-1">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

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
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);

                                            setErrors((prev) => ({
                                                ...prev,
                                                password: "",
                                                confirmPassword: ""
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

                            {/* Confirm Password */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Confirm Password
                                </label>

                                <div className="login-input">
                                    <i className="bi bi-lock-fill"></i>

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);

                                            setErrors((prev) => ({
                                                ...prev,
                                                confirmPassword: ""
                                            }));

                                            setServerError("");
                                        }}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide confirm password"
                                                : "Show confirm password"
                                        }
                                    >
                                        <i
                                            className={`bi ${
                                                showConfirmPassword
                                                    ? "bi-eye-slash"
                                                    : "bi-eye"
                                            }`}
                                        ></i>
                                    </button>
                                </div>

                                {errors.confirmPassword && (
                                    <div className="text-danger small mt-1">
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </div>

                            {/* Server Error */}
                            {serverError && (
                                <div className="alert alert-danger">
                                    {serverError}
                                </div>
                            )}

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="login-submit-btn"
                                disabled={loading}
                            >
                                <i className="bi bi-person-plus me-2"></i>

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                            {/* Security Notice */}
                            <div className="secure-login mt-4">
                                <i className="bi bi-shield-check"></i>

                                <div>
                                    <strong>
                                        Secure Registration
                                    </strong>

                                    <p>
                                        Your account information is protected.
                                    </p>
                                </div>
                            </div>

                            {/* Login Link */}
                            <p className="register-prompt">
                                Already have an account?{" "}

                                <Link to="/login">
                                    Login here
                                </Link>
                            </p>

                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Register;
