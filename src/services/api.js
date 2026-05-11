import axios from 'axios'

const API = axios.create({
  baseURL: 'http://13.51.55.61:8000',
})

export default API
