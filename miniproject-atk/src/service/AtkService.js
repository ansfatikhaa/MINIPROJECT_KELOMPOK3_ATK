import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/atks";

export const listAtks = () => axios.get(REST_API_BASE_URL + "/getAtks");
