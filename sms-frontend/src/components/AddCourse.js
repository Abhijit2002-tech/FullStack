import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddCourse = () => {
  const [course, setCourse] = useState({ id: "", courseName: "", description: "", duration: "", fee:"" });
  const navigate = useNavigate();
  const { id } = useParams(); // for edit

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/courses/${id}`)
        .then((res) => setCourse(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (id) {
      await axios.put(`http://localhost:8080/api/courses/${id}`, course);
    } else {
      await axios.post("http://localhost:8080/api/courses", course);
    }
    navigate("/courses");
  } catch (err) {
    console.error("Error saving course:", err);
  }


  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          {id ? "Edit Course" : "Add Course"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Duration</label>
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fee</label>
            <input
              type="text"
              name="fee"
              value={course.fee}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            {id ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
