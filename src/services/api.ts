import axios from "axios";

export const apiNextRoute = axios.create({
  baseURL: "/api",
});
