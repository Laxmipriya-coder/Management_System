
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const app = express();

// ================= MIDDLEWARE =================

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json());

// ================= HOME ROUTE =================

app.get("/", (req, res) => {
    res.send("College Management Backend is running!");
});

// ================= COLLEGE CRUD =================

// Get All Colleges
app.get("/api/colleges", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM colleges ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Get colleges error:", error.message);

        res.status(500).json({
            message: "Failed to fetch colleges"
        });
    }
});

// Insert College
app.post("/api/colleges", async (req, res) => {
    const { college_name, address, email } = req.body;

    if (!college_name || !address || !email) {
        return res.status(400).json({
            message: "Please provide all college details"
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO colleges
                (college_name, address, email)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [college_name, address, email]
        );

        res.status(201).json({
            message: "College inserted successfully",
            college: result.rows[0]
        });
    } catch (error) {
        console.error("Insert college error:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
});

// Update College
app.put("/api/colleges/:id", async (req, res) => {
    const { id } = req.params;
    const { college_name, address, email } = req.body;

    if (!college_name || !address || !email) {
        return res.status(400).json({
            message: "Please provide all college details"
        });
    }

    try {
        const result = await pool.query(
            `UPDATE colleges
             SET college_name = $1,
                 address = $2,
                 email = $3
             WHERE id = $4
             RETURNING *`,
            [college_name, address, email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "College not found"
            });
        }

        res.json({
            message: "College updated successfully",
            college: result.rows[0]
        });
    } catch (error) {
        console.error("Update college error:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
});

// Delete College
app.delete("/api/colleges/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM colleges
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "College not found"
            });
        }

        res.json({
            message: "College deleted successfully"
        });
    } catch (error) {
        console.error("Delete college error:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
});

// ================= USERS CRUD =================

// Get All Users
app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email, role, college_id
             FROM users
             ORDER BY id`
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Get users error:", error.message);

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
});

// Insert User
// Password is hashed before saving
app.post("/api/users", async (req, res) => {
    const {
        name,
        email,
        password,
        role,
        college_id
    } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "Please provide all required user details"
        });
    }

    if (!["admin", "college", "student"].includes(role)) {
        return res.status(400).json({
            message: "Invalid user role"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
                (name, email, password, role, college_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, email, role, college_id`,
            [
                name,
                email.trim(),
                hashedPassword,
                role,
                college_id || null
            ]
        );

        res.status(201).json({
            message: "User inserted successfully",
            user: result.rows[0]
        });
    } catch (error) {
        console.error("Insert user error:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
});

// Update User
app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;

    const {
        name,
        email,
        password,
        role,
        college_id
    } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({
            message: "Please provide name, email, and role"
        });
    }

    if (!["admin", "college", "student"].includes(role)) {
        return res.status(400).json({
            message: "Invalid user role"
        });
    }

    try {
        let result;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            result = await pool.query(
                `UPDATE users
                 SET name = $1,
                     email = $2,
                     password = $3,
                     role = $4,
                     college_id = $5
                 WHERE id = $6
                 RETURNING id, name, email, role, college_id`,
                [
                    name,
                    email.trim(),
                    hashedPassword,
                    role,
                    college_id || null,
                    id
                ]
            );
        } else {
            result = await pool.query(
                `UPDATE users
                 SET name = $1,
                     email = $2,
                     role = $3,
                     college_id = $4
                 WHERE id = $5
                 RETURNING id, name, email, role, college_id`,
                [
                    name,
                    email.trim(),
                    role,
                    college_id || null,
                    id
                ]
            );
        }

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User updated successfully",
            user: result.rows[0]
        });
    } catch (error) {
        console.error("Update user error:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
});

// Delete User
app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM users
             WHERE id = $1
             RETURNING id`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Delete user error:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
});

// ================= STUDENT CRUD =================

// Get All Students
app.get("/api/students", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                students.id,
                users.name,
                users.email,
                students.student_roll_no,
                students.course,
                students.year,
                students.college_id
            FROM students
            JOIN users
                ON students.user_id = users.id
            ORDER BY students.id
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Get students error:", error.message);

        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
});

// Insert Student
app.post("/api/students", async (req, res) => {
    const {
        name,
        email,
        password,
        student_roll_no,
        course,
        year,
        college_id
    } = req.body;

    if (
        !name ||
        !email ||
        !password ||
        !student_roll_no ||
        !course ||
        !year ||
        !college_id
    ) {
        return res.status(400).json({
            message: "Please provide all required student details"
        });
    }

    let client;

    try {
        client = await pool.connect();

        await client.query("BEGIN");

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        const userResult = await client.query(
            `INSERT INTO users
                (name, email, password, role, college_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
            [
                name,
                email.trim(),
                hashedPassword,
                "student",
                college_id
            ]
        );

        const userId = userResult.rows[0].id;

        // Insert into students table
        const studentResult = await client.query(
            `INSERT INTO students
                (user_id, student_roll_no, course, year, college_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [
                userId,
                student_roll_no,
                course,
                Number(year),
                college_id
            ]
        );

        await client.query("COMMIT");

        res.status(201).json({
            message: "Student inserted successfully",
            student: studentResult.rows[0]
        });
    } catch (error) {
        if (client) {
            await client.query("ROLLBACK");
        }

        console.error("Insert student error:", error.message);

        res.status(500).json({
            message: error.message
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// Update Student
app.put("/api/students/:id", async (req, res) => {
    const { id } = req.params;

    const {
        name,
        email,
        student_roll_no,
        course,
        year,
        college_id
    } = req.body;

    let client;

    try {
        client = await pool.connect();

        await client.query("BEGIN");

        const studentResult = await client.query(
            `SELECT user_id
             FROM students
             WHERE id = $1`,
            [id]
        );

        if (studentResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                message: "Student not found"
            });
        }

        const userId = studentResult.rows[0].user_id;

        // Update users
        await client.query(
            `UPDATE users
             SET name = $1,
                 email = $2,
                 college_id = $3
             WHERE id = $4`,
            [
                name,
                email.trim(),
                college_id,
                userId
            ]
        );

        // Update students
        await client.query(
            `UPDATE students
             SET student_roll_no = $1,
                 course = $2,
                 year = $3,
                 college_id = $4
             WHERE id = $5`,
            [
                student_roll_no,
                course,
                Number(year),
                college_id,
                id
            ]
        );

        await client.query("COMMIT");

        res.json({
            message: "Student updated successfully"
        });
    } catch (error) {
        if (client) {
            await client.query("ROLLBACK");
        }

        console.error("Update student error:", error.message);

        res.status(500).json({
            message: error.message
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// Delete Student
app.delete("/api/students/:id", async (req, res) => {
    const { id } = req.params;

    let client;

    try {
        client = await pool.connect();

        await client.query("BEGIN");

        const studentResult = await client.query(
            `SELECT user_id
             FROM students
             WHERE id = $1`,
            [id]
        );

        if (studentResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                message: "Student not found"
            });
        }

        const userId = studentResult.rows[0].user_id;

        await client.query(
            "DELETE FROM students WHERE id = $1",
            [id]
        );

        await client.query(
            "DELETE FROM users WHERE id = $1",
            [userId]
        );

        await client.query("COMMIT");

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        if (client) {
            await client.query("ROLLBACK");
        }

        console.error("Delete student error:", error.message);

        res.status(500).json({
            message: error.message
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// ================= USER REGISTRATION =================

app.post("/api/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "Please provide all required details"
        });
    }

    if (!["admin", "college", "student"].includes(role)) {
        return res.status(400).json({
            message: "Invalid user role"
        });
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();

        // Check whether the email already exists
        const existingUser = await pool.query(
            `SELECT id
             FROM users
             WHERE LOWER(email) = $1`,
            [normalizedEmail]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
                (name, email, password, role, college_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, email, role, college_id`,
            [
                name.trim(),
                normalizedEmail,
                hashedPassword,
                role,
                null
            ]
        );

        res.status(201).json({
            message: "Registration successful",
            user: result.rows[0]
        });
    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});

// ================= USER LOGIN =================

app.post("/api/login", async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            message: "Please provide email, password, and role"
        });
    }

    if (!["admin", "college", "student"].includes(role)) {
        return res.status(400).json({
            message: "Invalid user role"
        });
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();

        const result = await pool.query(
            `SELECT id, name, email, password, role, college_id
             FROM users
             WHERE LOWER(email) = $1
             AND role = $2`,
            [normalizedEmail, role]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email, password, or role"
            });
        }

        const user = result.rows[0];

        // Compare entered password with stored hash
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Do not send the password to the frontend
        delete user.password;

        res.status(200).json({
            message: "Login successful",
            user
        });
    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            message: "Login failed"
        });
    }
});

// ================= START SERVER =================

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
