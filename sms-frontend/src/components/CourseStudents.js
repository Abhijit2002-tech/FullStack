import React,{useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";


const CourseStudents =() =>{
    const {id} = useParams(); // course id route  course/{id}/students
    const [students, setStudents] = useState([]);
    const [courseName, setCourseName] = useState("");

    useEffect(()=>{

        //Fetch students enrolled in this course

        const fetchStudents = async () =>{
            try{
                const res = await axios.get(`http://localhost:8080/api/courses/${id}/students`);
                setStudents(res.data);

            }catch(error){
                console.error("Error fetching students:", error);
            }
        };

        //Fetch course name (optional)
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/courses/${id}`);
                setCourseName(res.data.courseName);
                
            } catch (error) {
                console.error("Error fetching course:", error);
                
            }
            
        };

        fetchStudents();
        fetchCourses();
    },[id]);

    return(
        <div className="container mt-4">
             <h2 className="text-center mb-4">
        Students Enrolled in <span className="text-primary">{courseName || "Course"}</span>

      </h2>

      {students.length === 0 ? (
        <p className="text-center text-muted">No students enrolled in this course.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-center mt-3">
        <Link to="/courses" className="btn btn-secondary">
          Back to Courses
        </Link>
      </div>

        </div>
    );

};

export default CourseStudents;