import axios from 'axios';
import { API_URL } from "../env";

const calendarApi = axios.create({
    baseURL: API_URL
})

//cada vez que se invoque una request de calendar api se setea el header.
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;
})

export default calendarApi;