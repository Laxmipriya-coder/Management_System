
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/students";

function Student() {
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        student_roll_no: "",
        course: "",
        year: "",
        college_id: "1"
    });

    // READ - Get all students
    async function fetchStudents() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to fetch students"
                );
            }

            setStudents(
                Array.isArray(data) ? data : data.students || []
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // Reset form
    function resetForm() {
        setFormData({
            name: "",
            email: "",
            password: "",
            student_roll_no: "",
            course: "",
            year: "",
            college_id: "1"
        });

        setEditId(null);
        setShowForm(false);
    }

    // Open Add Student Form
    function handleAdd() {
        resetForm();
        setError("");
        setShowForm(true);
    }

    // Open Edit Student Form
    function handleEdit(student) {
        setEditId(student.id);

        setFormData({
            name: student.name || "",
            email: student.email || "",
            password: "",
            student_roll_no: student.student_roll_no || "",
            course: student.course || "",
            year: student.year || "",
            college_id: String(student.college_id || 1)
        });

        setShowForm(true);
        setError("");
    }

    // CREATE and UPDATE
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const url = editId
                ? `${API_URL}/${editId}`
                : API_URL;

            const method = editId ? "PUT" : "POST";

            const payload = {
                ...formData,
                year: Number(formData.year),
                college_id: Number(formData.college_id)
            };

            // Do not send an empty password while editing
            if (editId && !payload.password) {
                delete payload.password;
            }

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Operation failed"
                );
            }

            alert(
                editId
                    ? "Student updated successfully!"
                    : "Student added successfully!"
            );

            resetForm();

            await fetchStudents();

        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    // DELETE Student
    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {
            setDeletingId(id);
            setError("");

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to delete student"
                );
            }

            // Remove deleted student from the UI
            setStudents((prevStudents) =>
                prevStudents.filter(
                    (student) => student.id !== id
                )
            );

            alert("Student deleted successfully!");

        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="container mt-5 mb-5">

            {/* Dashboard Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-primary">
                        Student Dashboard
                    </h2>

                    <p className="text-muted mb-0">
                        Manage student information and academic records.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleAdd}
                >
                    <i className="bi bi-person-plus me-2"></i>
                    Add Student
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Add / Edit Form */}
            {showForm && (
                <div className="card shadow-sm border-0 mb-4">

                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">
                            {editId
                                ? "Edit Student"
                                : "Add New Student"}
                        </h5>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">

                                {/* Student Name */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">
                                        Student Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter student name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter student email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                {!editId && (
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Roll Number */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">
                                        Roll Number
                                    </label>

                                    <input
                                        type="text"
                                        name="student_roll_no"
                                        className="form-control"
                                        placeholder="Enter roll number"
                                        value={formData.student_roll_no}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Course */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">
                                        Course
                                    </label>

                                    <input
                                        type="text"
                                        name="course"
                                        className="form-control"
                                        placeholder="Enter course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Academic Year */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">
                                        Academic Year
                                    </label>

                                    <input
                                        type="number"
                                        name="year"
                                        className="form-control"
                                        placeholder="Enter academic year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>

                                {/* College ID */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">
                                        College ID
                                    </label>

                                    <input
                                        type="number"
                                        name="college_id"
                                        className="form-control"
                                        value={formData.college_id}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>

                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                className="btn btn-success me-2"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editId
                                        ? "Update Student"
                                        : "Save Student"}
                            </button>

                            {/* Cancel Button */}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        </form>
                    </div>
                </div>
            )}

            {/* Student Information Table */}
            <div className="card shadow-sm border-0">

                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                        Student Information
                    </h5>
                </div>

                <div className="card-body">

                    {loading ? (
                        <p className="text-center">
                            Loading students...
                        </p>
                    ) : students.length === 0 ? (
                        <p className="text-center text-muted">
                            No students found.
                        </p>
                    ) : (
                        <div className="table-responsive">

                            <table className="table table-hover table-bordered align-middle">

                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Student Name</th>
                                        <th>Roll Number</th>
                                        <th>Course</th>
                                        <th>Academic Year</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.id}>

                                            <td>{index + 1}</td>

                                            <td>{student.name}</td>

                                            <td>
                                                {student.student_roll_no}
                                            </td>

                                            <td>{student.course}</td>

                                            <td>{student.year}</td>

                                            <td>
                                                {/* Edit Button */}
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() =>
                                                        handleEdit(student)
                                                    }
                                                >
                                                    <i className="bi bi-pencil-square me-1"></i>
                                                    Edit
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(student.id)
                                                    }
                                                    disabled={
                                                        deletingId === student.id
                                                    }
                                                >
                                                    {deletingId === student.id ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                                            Deleting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-trash me-1"></i>
                                                            Delete
                                                        </>
                                                    )}
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Student;
