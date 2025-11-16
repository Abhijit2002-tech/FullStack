import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddStudent = () => {
  const [student, setStudent] = useState({ name: "", email: "", phone: "" , address:""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // if present → edit mode

  // 🔹 Fetch student details for edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/api/students/${id}`)
        .then((res) => setStudent(res.data))
        .catch(() => setError("Failed to fetch student data."))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // 🔹 Handle form input
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!student.name || !student.email || !student.phone || !student.address) {
        setError("All fields are required.");
        return;
      }

      if (id) {
        // Update existing
        await axios.put(`http://localhost:8080/api/students/${id}`, student);
      } else {
        // Create new
        await axios.post("http://localhost:8080/api/students", student);
      }
      navigate("/students");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  // 🔹 Optional: loading state
  if (loading) {
    return <div className="text-center mt-5">Loading student data...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          {id ? "Edit Student" : "Add Student"}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter student name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter student email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>
           <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your address"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            {id ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
