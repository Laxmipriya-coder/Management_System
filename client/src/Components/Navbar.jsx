import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className='bg-warning container-fluid'>
                <h2>Management System</h2>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to ={"/student"}>Student</Link></li>
                    <li><Link to={"/college"}>College</Link></li>
                    <li><Link to={"/users"}>Users</Link></li>
                </ul>
                <div className="btns">
                    <Link to={"/login"} className='btn btn-primary'>Login</Link>
                    <Link to={"/register"} className='btn btn-danger ms-3'>Register</Link>
                </div>
            </nav>
        </>
    )
}
export default Navbar;