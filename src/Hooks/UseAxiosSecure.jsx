import axios from 'axios';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://note-hive-server.vercel.app'
})

const UseAxiosSecure = () => {
    const {signOutUser} = UseAuth();
    const navigate = useNavigate()
    /* axios interceptors by request */
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error);
    }
    )
    /* axios interceptor by response */
    axiosSecure.interceptors.response.use(function(response){
        return response
    }, function(error){
        const status = error.response.status;
        if (status === 401 || status === 403) {
            signOutUser();
            navigate('/login')

        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default UseAxiosSecure;