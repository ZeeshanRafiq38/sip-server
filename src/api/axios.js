import axios from "axios";

export const baseURL = 'http://localhost:5500'

export default axios.create({
    baseURL: baseURL,
});