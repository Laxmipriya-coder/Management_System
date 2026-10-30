
import React, { useEffect, useState } from "react";

function College() {
    const [colleges, setColleges] = useState([]);
    const [collegeName, setCollegeName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);

    const API_URL = "http://localhost:5000/api/colleges";

    // Get Colleges
    const fetchColleges = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setColleges(data);
        } catch (error) {
            console.error("Error fetching colleges:", error);
        }
    };

    useEffect(() => {
        fetchColleges();
    }, []);

    // Clear Form
    const clearForm = () => {
        setCollegeName("");
        setAddress("");
        setEmail("");
        setEditId(null);
    };

    // Add or Update College
    const handleSubmit = async (e) => {
        e.preventDefault();

        const collegeData = {
            college_name: collegeName,
            address,
            email
        };

        try {
            const url = editId
                ? `${API_URL}/${editId}`
                : API_URL;

            const method = editId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(collegeData)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Operation failed");
                return;
            }

            alert(result.message);

            clearForm();
            fetchColleges();

        } catch (error) {
            console.error("Error saving college:", error);
        }
    };

    // Edit College
    const handleEdit = (college) => {
        setCollegeName(college.college_name);
        setAddress(college.address);
        setEmail(college.email);
        setEditId(college.id);
    };

    // Delete College
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this college?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Delete failed");
                return;
            }

            alert(result.message);
            fetchColleges();

        } catch (error) {
            console.error("Error deleting college:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">
                College Management
            </h2>

            {/* College Form */}
            <form
                onSubmit={handleSubmit}
                className="card p-4 mb-4"
            >
                <div className="mb-3">
                    <label className="form-label">
                        College Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={collegeName}
                        onChange={(e) =>
                            setCollegeName(e.target.value)
                        }
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Address
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {editId ? "Update College" : "Add College"}
                </button>

                {editId && (
                    <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={clearForm}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* College Table */}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>College Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {colleges.map((college) => (
                        <tr key={college.id}>
                            <td>{college.id}</td>
                            <td>{college.college_name}</td>
                            <td>{college.address}</td>
                            <td>{college.email}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() =>
                                        handleEdit(college)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(college.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default College;
