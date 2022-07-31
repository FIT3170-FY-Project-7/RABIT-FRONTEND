import axios from 'axios'

let baseURL = 'http://localhost:8000/'

if (process.env.backend === 'online') {
    baseURL = 'https://backend.rabit2022.cloud.edu.au/'
}

const api = axios.create({
    baseURL
})

export default api
