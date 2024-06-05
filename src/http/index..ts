import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://87.228.8.200:5000'
})

export {
    $host
}