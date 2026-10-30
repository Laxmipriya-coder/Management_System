
import React, { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [collegeId, setCollegeId] = useState("");

    const [colleges, setColleges] = useState([]);
    const [editId, setEditId] = useState(null);

    const API_URL = "http://localhost:5000/api/users";
    const COLLEGE_API = "http://localhost:5000/api/colleges";

    // Get All Users
    const fetchUsers = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setUsers(data);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Get Colleges
    const fetchColleges = async () => {
        try {
            const response = await fetch(COLLEGE_API);
            const data = await response.json();

            setColleges(data);

        } catch (error) {
            console.error("Error fetching colleges:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchColleges();
    }, []);

    // Clear Form
    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setRole("student");
        setCollegeId("");
        setEditId(null);
    };

    // Insert or Update User
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            role,
            college_id: collegeId ? Number(collegeId) : null
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
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Operation failed");
                return;
            }

            alert(result.message);

            clearForm();
            await fetchUsers();

        } catch (error) {
            console.error("Error saving user:", error);
            alert("Something went wrong. Check the backend terminal.");
        }
    };

    // Edit User
    const handleEdit = (user) => {
        setName(user.name);
        setEmail(user.email);
        setPassword("");
        setRole(user.role);
        setCollegeId(user.college_id || "");
        setEditId(user.id);
    };

    // Delete User
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
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

            await fetchUsers();

        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">
                User Management
            </h2>

            {/* User Form */}
            <form
                onSubmit={handleSubmit}
                className="card p-4 mb-4"
            >
                <div className="mb-3">
                    <label className="form-label">
                        Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={
                            editId
                                ? "Leave blank to keep current password"
                                : "Enter password"
                        }
                        required={!editId}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Role
                    </label>

                    <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="college">College</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        College
                    </label>

                    <select
                        className="form-select"
                        value={collegeId}
                        onChange={(e) =>
                            setCollegeId(e.target.value)
                        }
                    >
                        <option value="">
                            Select College
                        </option>

                        {colleges.map((college) => (
                            <option
                                key={college.id}
                                value={college.id}
                            >
                                {college.college_name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {editId ? "Update User" : "Insert User"}
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

            {/* Users Table */}
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>College ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.college_id || "N/A"}</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            handleEdit(user)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(user.id)
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
        </div>
    );
}

export default Users;
