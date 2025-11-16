import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses, deleteCourse } from "./courseService";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllCourses();
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        alert("Course deleted successfully!");
        fetchCourses();
      } catch (err) {
        console.error("Error deleting course:", err)
        alert("Error deleting course!");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading courses...</div>;
  }

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center flex-column"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "900px" }}>
        <h2 className="text-center text-primary mb-4">📚 Course List</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <div className="text-end mb-3">
  <Link to="/courses/add" className="btn btn-success">
    ➕ Add New Course
  </Link>
</div>


        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.courseName}</td>
                  <td>{c.description}</td>
                  <td>{c.duration}</td>
                  <td>{c.fee}</td>
                  <td>
                    <Link
                       to={`/courses/${c.id}/students`}
                        className="btn btn-info btn-sm me-2"
                      >
                        View Students
                     </Link>
                    <Link
                      to={`/courses/edit/${c.id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                       Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="btn btn-danger btn-sm"
                    >
                       Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
