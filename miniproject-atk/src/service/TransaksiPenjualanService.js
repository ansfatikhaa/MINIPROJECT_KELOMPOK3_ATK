// TrPenjualanService.js
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/penjualans";

export const listPenjualans = () => axios.get(REST_API_BASE_URL + "/getPenjualans");
export const getPenjualanById = (id) => axios.get(REST_API_BASE_URL + `/getPenjualanById/${id}`);
export const savePenjualan = (transaksiPenjualan) => axios.post(REST_API_BASE_URL + "/savePenjualan", transaksiPenjualan);
export const getTotalPenjualanPerYear = (tahun) => axios.get(`${REST_API_BASE_URL}/Dashboard/${tahun}`);
