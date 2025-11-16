import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";

import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import AddCourse from "./components/AddCourse";
import CourseList from "./components/CourseList";
import CourseStudents from "./components/CourseStudents";
import EnrollStudent from "./components/EnrollStudent";



const App = () => {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* 🔒 Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Layout>
              <StudentList />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-student"
        element={
          <ProtectedRoute>
            <Layout>
              <AddStudent />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <AddStudent />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/courses"
  element={
    <ProtectedRoute>
      <Layout>
        <CourseList />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/courses/add"
  element={
    <ProtectedRoute>
      <Layout>
        <AddCourse />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/courses/edit/:id"
  element={
    <ProtectedRoute>
      <Layout>
        <AddCourse />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route path="/courses/:id/students" element={<CourseStudents />} />
<Route path="/enroll" element={<EnrollStudent/>} />


      {/* 🚦 Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    
  );
};

export default App;
