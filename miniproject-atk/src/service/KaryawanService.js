import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/karyawans";

// Karyawan
export const logins = (name, email) => axios.post(REST_API_BASE_URL + "/login", { name, email });
export const listKaryawan = () => axios.get(REST_API_BASE_URL + "/getKaryawans");
export const saveKaryawan = (kry) => axios.post(REST_API_BASE_URL + "/saveKaryawan", kry);
export const getKaryawanById = (id) => axios.get(REST_API_BASE_URL + `/getKaryawanById/${id}`);
export const updateKaryawan = (kry, id) => axios.post(REST_API_BASE_URL + `/updateKaryawan/${id}`, kry);
export const deleteKaryawan = (id) => axios.post(REST_API_BASE_URL + `/deleteKaryawan/${id}`);