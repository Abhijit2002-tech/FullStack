package com.example.sms.repository;

import com.example.sms.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import javax.tools.JavaFileObject;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
}
