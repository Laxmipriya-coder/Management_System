
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Footer() {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="row g-4">

                    {/* Brand Section */}
                    <div className="col-lg-4 col-md-6">
                        <h3 className="footer-brand">
                            College<span>Portal</span>
                        </h3>

                        <p className="footer-description">
                            A smart and reliable platform to manage colleges,
                            students, and administrative activities.
                            Making education management simple and efficient.
                        </p>

                        <div className="footer-social">
                            <a href="https://facebook.com" aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a href="https://instagram.com" aria-label="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a href="https://linkedin.com" aria-label="LinkedIn">
                                <i className="bi bi-linkedin"></i>
                            </a>

                            <a href="https://twitter.com" aria-label="Twitter">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="footer-heading">Quick Links</h5>

                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/student">Students</Link></li>
                            <li><Link to="/college">Colleges</Link></li>
                        </ul>
                    </div>

                    {/* Account Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="footer-heading">Account</h5>

                        <ul className="footer-links">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/admin">Admin Panel</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="footer-heading">Contact Us</h5>

                        <p className="footer-contact">
                            <i className="bi bi-geo-alt-fill"></i>
                            <span>Bhubaneswar, Odisha, India</span>
                        </p>

                        <p className="footer-contact">
                            <i className="bi bi-envelope-fill"></i>
                            <a href="mailto:support@collegeportal.com">
                                support@collegeportal.com
                            </a>
                        </p>

                        <p className="footer-contact">
                            <i className="bi bi-telephone-fill"></i>
                            <a href="tel:+919876543210">
                                +91 98765 43210
                            </a>
                        </p>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p>
                        © 2026 CollegePortal. All rights reserved.
                    </p>

                    <p>
                        Designed with <i className="bi bi-heart-fill"></i> for Education
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
