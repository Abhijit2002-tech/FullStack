import axios from "axios";
const BASE_URL = "http://localhost:8080/api";
export const getAllStudents = () => axios.get(`${BASE_URL}/student`);
export const getAllCourses = ()=> axios.get(`${BASE_URL}/courses`);
export const getAllAuth = ()=> axios.get(`${BASE_URL}/auth`);