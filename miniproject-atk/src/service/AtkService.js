// AtkService.js
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/atks";

export const listAtks = () => axios.get(REST_API_BASE_URL + "/getAtks");
export const saveAtk = (atk) => axios.post(REST_API_BASE_URL + "/saveAtk", atk);
export const getAtkById = (id) => axios.get(REST_API_BASE_URL + `/getAtkById/${id}`);
export const updateAtk = (atk, id) => axios.post(REST_API_BASE_URL + `/updateAtk/${id}`, atk);
export const deleteAtk = (id) => axios.post(REST_API_BASE_URL + `/deleteAtk/${id}`);