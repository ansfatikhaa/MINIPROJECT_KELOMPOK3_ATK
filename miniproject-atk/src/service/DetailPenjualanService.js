// DetailPenjualanService.js
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/detailPenjualan";

export const listDetailPenjualans = () => axios.get(REST_API_BASE_URL + "/getDetailPenjualans");
export const listDetailPenjualanActive = () => axios.get(REST_API_BASE_URL + "/getDetailPenjualanActive");
export const saveDetailPenjualan = (detailPenjualan) => axios.post(REST_API_BASE_URL + "/saveDetailPenjualan", detailPenjualan);
