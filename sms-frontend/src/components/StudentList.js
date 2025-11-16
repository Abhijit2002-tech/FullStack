import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/students");
      setStudents(response.data);
    } catch (err) {
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8080/api/students/${id}`);
        fetchStudents(); // refresh after delete
      } catch (err) {
        alert("Failed to delete student.");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading students...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Student List</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow">
        <div className="card-body">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark text-center">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((s) => (
                  <tr key={s.id} className="align-middle text-center">
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td>{s.address}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="btn btn-danger btn-sm me-2"
                      >
                        Delete
                      </button>

                      <Link
                        to={`/students/edit/${s.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
