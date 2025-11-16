// src/components/courseService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/courses";

export const getAllCourses = async () => {
  return await axios.get(BASE_URL);
};

export const getCourseById = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

export const saveCourse = async (course) => {
  return await axios.post(BASE_URL, course);
};

export const updateCourse = async (id, course) => {
  return await axios.put(`${BASE_URL}/${id}`, course);
};

export const deleteCourse = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};
