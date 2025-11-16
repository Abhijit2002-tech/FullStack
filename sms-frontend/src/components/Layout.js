import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* ✅ Navbar (only for logged-in users) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">AD Institute of Technology</Link>
          <div>
            <Link className="nav-link d-inline text-white" to="/">Home</Link>
            <Link className="nav-link d-inline text-white ms-3" to="/add-student">Add Student</Link>
            <Link className="nav-link d-inline text-white ms-3" to="/students">Student List</Link>
            <Link className="nav-link d-inline text-white ms-3" to="/courses">Courses</Link>

            <Link to="/enroll" className="btn btn-primary  ms-3">Enroll Student</Link>

            <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-4">{children}</div>
    </>
  );
};

export default Layout;
