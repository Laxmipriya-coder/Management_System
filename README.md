# 🎓 College Management System

A full-stack web application developed to manage college information and student academic records. The system provides a user-friendly interface to view and manage student details using React, Node.js, Express.js, and PostgreSQL.

## 📌 Project Overview

The College Management System helps organize student and college information in one place. It follows a client-server architecture, where the React frontend communicates with the Express backend through REST APIs, and PostgreSQL stores the application data.

## ✨ Features

- Student record management
- College information management
- User information management
- PostgreSQL database integration
- REST API integration
- React-based user interface
- Bootstrap styling
- Client-server architecture

## 🛠️ Technologies Used

**Frontend**
- React.js
- JavaScript
- HTML
- CSS
- Bootstrap

**Backend**
- Node.js
- Express.js

**Database**
- PostgreSQL

**Tools**
- VS Code
- pgAdmin
- Git
- GitHub
- Postman

## 📂 Project Structure

```text
College-Management-System/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── server.js
│   ├── db.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Laxmipriya-coder/College-Management-System.git
cd College-Management-System
```

### 2. Set Up the Database

Create a PostgreSQL database named:

```sql
CREATE DATABASE college_management;
```

Create the required tables and configure the database connection in the backend.

### 3. Run the Backend

```bash
cd server
npm install
node server.js
```

The backend runs at:

```text
http://localhost:5000
```

### 4. Run the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/colleges` | Retrieve college records |
| GET | `/api/users` | Retrieve user records |
| GET | `/api/students` | Retrieve student records |
| POST | `/api/students` | Add a student record |

*Additional endpoints can be added as the project develops.*

## 🔮 Future Enhancements

- User authentication and authorization
- Role-based access for students, colleges, and administrators
- Student profile management
- Search and filtering
- Pagination
- Improved dashboard design
- Form validation

## 👩‍💻 Author

**Laxmipriya Mishra**

MCA Graduate | Aspiring Full Stack Developer

[GitHub Profile](https://github.com/Laxmipriya-coder)

---

⭐ If you find this project useful, feel free to star the repository!
