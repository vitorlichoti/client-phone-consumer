import axios from "axios";

const axiosAuthHandler = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000
})

const axiosProductsHandler = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000
})

export { axiosAuthHandler, axiosProductsHandler };