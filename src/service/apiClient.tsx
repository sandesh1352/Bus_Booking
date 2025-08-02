import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken } from './storage';
import { BASE_URL } from './config';

const apiClient = axios.create({
    baseURL:BASE_URL
})

// Request Interceptor : it checks do i have access token then attach it and request for data

apiClient.interceptors.request.use(
    async config =>{
        const token = getAccessToken()
        if(token){
            config.headers.Authorization= `Bearer ${token}`
        }

        return config
    },
    error => Promise.reject(error)
);

// Response Interceptor: it handle if you get error, response not come to handle this we use this interceptor

apiClient.interceptors.response.use(
    response=>response,
    async error=>{
        if(error.response?.status === 403){
            const refreshToken = getRefreshToken();
            if(!refreshToken){
                return Promise.reject(error)
            }

            try {
                const {data} = await axios.post(`${BASE_URL}/user/refresh`,{refreshToken})
                setAccessToken(data?.accessToken)
                error.config.headers.Authorization = `Bearer ${data?.accessToken}`
                return axios(error.config)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default apiClient