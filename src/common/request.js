import axios from 'axios'

// Create an axios instance
const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000 // Request timeout
})

// Request interceptor
request.interceptors.request.use(
  (config) => {
    config.params = config.params || {}

    return config
  },
  (error) => {
    console.log(error)

    return Promise.reject(error)
  }
)

// Response interceptor
request.interceptors.response.use(
  (response) => {
    const res = response.data

    return res
  },
  (error) => {
    // Global API response error handling here...
    console.log(error)

    return Promise.reject(error)
  }
)

export { request }
