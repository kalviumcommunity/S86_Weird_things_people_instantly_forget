// api.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000"; // your backend base
axios.defaults.withCredentials = true;

export default axios;
