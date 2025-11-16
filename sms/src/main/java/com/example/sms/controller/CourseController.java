package com.example.sms.controller;

import com.example.sms.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.sms.service.CourseService;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private  CourseService  courseService;

    //Add a new course
    @PostMapping
    public Course addCourse(@RequestBody Course course){
        return courseService.saveCourse(course);
    }
    //get all course
    @GetMapping
    public List<Course>getAllcourses(){
        return courseService.getAllCourses();
    }
    //get single course by ID
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id){
        return courseService.getCourseById(id);
    }
    //delete
    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable long id){
         courseService.deleteCourse(id);
         return "Course deleted successfully";
    }
}
