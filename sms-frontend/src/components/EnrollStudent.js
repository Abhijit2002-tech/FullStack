import React, {useEffect, useState} from "react";
import axios from "axios";

const EnrollStudent = () => {

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setSelectedCourse] =useState("");
    const [message, setMessage] = useState("");


    useEffect (()=>{

        //fetch all students

        axios.get("http://localhost:8080/api/students")
        .then((res) => setStudents(res.data))
        .catch((err)=> console.error(err));

        //fetch all courses

        axios.get("http://localhost:8080/api/courses")
        .then((res)=> setCourses(res.data))
        .catch((err)=> console.error(err));
    },[]);

    const handleEnroll = async () =>{
        if(!selectedStudent || !selectedCourse){
            alert("Please select both student and course!");
            return;
        }

        try {
            await axios.post(`http://localhost:8080/api/students/${selectedStudent}/enroll/${selectedCourse}`);
            setMessage("Student erolled successfully!");
        } catch (err) {
            console.error(err);
            setMessage("Failed to enroll student");
            
        }

    };

    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Enroll Student in Course</h2>

            <div className="card p-4 shadow-lg">
                <div className="mb-3">
                    <label className="form-label">Select Student:</label>
                    <select 
                    className="form-select"
                    value={selectedStudent} onChange={(e) =>setSelectedStudent(e.target.value)}
                    >
                        <option value="">-- Select Student</option>
                        {students.map((s)=>(
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Course:</label>
                    <select
                    className="form-select" value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}>
                        <option value="">--Select Course</option>
                        {courses.map((c)=>(
                            <option key={c.id} value={c.id}>
                                {c.courseName}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-success w-100" onClick={handleEnroll}>
                    Enroll Student
                </button>
                {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
            </div>
        </div>
    );
    
};

export default EnrollStudent;