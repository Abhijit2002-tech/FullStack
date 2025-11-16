package com.example.sms.service;

import com.example.sms.model.Course;
import com.example.sms.model.Student;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    public final StudentRepository studentRepository;
    @Autowired
    private CourseRepository courseRepository;

    public Student enrollInCourse(Long studentId, Long courseId) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        Course course = courseRepository.findById(courseId).orElseThrow();

        student.getCourses().add(course);
        return studentRepository.save(student);
    }


    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id){
        return studentRepository.findById(id);
    }
    public Student saveStudent (Student student){
        return studentRepository.save(student);
    }
    public Student updateStudent(Long id, Student updateStudent){
        return studentRepository.findById(id).map(student -> {
            student.setName(updateStudent.getName());
            student.setEmail(updateStudent.getEmail());
            student.setCourses(updateStudent.getCourses());
            student.setPhone(updateStudent.getPhone());
            student.setAddress(updateStudent.getAddress());
            return studentRepository.save(student);
        })
                .orElseThrow(()->new RuntimeException("Student not found with id " + id));

    }
    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }
}
