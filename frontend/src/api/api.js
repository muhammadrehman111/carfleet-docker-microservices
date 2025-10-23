import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// Cars
export async function getCars() {
  const res = await axiosInstance.get("/cars");
  return res.data;
}

export async function getCarById(id) {
  const res = await axiosInstance.get(`/cars/${id}`);
  return res.data;
}

// Reports
// POST expects { car_id, payload } per backend
export async function createReport(car_id, payload) {
  const res = await axiosInstance.post("/reports", { car_id, payload });
  return res.data;
}

export async function getReportsForCar(car_id) {
  const res = await axiosInstance.get(`/reports/${car_id}`);
  return res.data;
}
