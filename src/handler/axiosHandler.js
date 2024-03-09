import axios from "axios";

const axiosAuthHandler = axios.create({
  baseURL: import.meta.env.AUTH_API,
  timeout: 1000
})

const axiosProductsHandler = axios.create({
  baseURL: import.meta.env.RESTFULL_API,
  timeout: 10000
})

export { axiosAuthHandler, axiosProductsHandler };