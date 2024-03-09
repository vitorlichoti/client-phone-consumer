import axios from "axios";

const axiosAuthHandler = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
  timeout: 1000
})

const axiosProductsHandler = axios.create({
  baseURL: import.meta.env.VITE_RESTFULL_API,
  timeout: 10000
})

export { axiosAuthHandler, axiosProductsHandler };