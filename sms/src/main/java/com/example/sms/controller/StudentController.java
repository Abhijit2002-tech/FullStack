package com.example.sms.controller;

import com.example.sms.model.Student;
import com.example.sms.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")//allow frontend access if needed

public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }
    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();

    }
    @GetMapping("/{id}")
    public Student getAllStudentById(@PathVariable Long id){
        return studentService.getStudentById(id)
                .orElseThrow(()-> new RuntimeException("Student not fount with id " + id));
    }
    @PostMapping
    public Student createStudent(@RequestBody Student student){
        return studentService.saveStudent(student);
    }
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student){
        return studentService.updateStudent(id,student);
    }
    @PostMapping("/{studentId}/enroll/{courseId}")
    public Student enrollCourse(@PathVariable Long studentId, @PathVariable Long courseId) {
        return studentService.enrollInCourse(studentId, courseId);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
        return "Student delete successfully!";
    }
}
