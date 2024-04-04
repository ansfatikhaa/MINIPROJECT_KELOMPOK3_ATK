// AtkService.js
import axios from "axios";

const REST_API_BASE_URL = "http://10.1.6.160:8080/atks";

export const listAtks = () => axios.get(REST_API_BASE_URL + "/getAtks");