import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://note-hive-server.vercel.app'
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;


// baseURL: 'https://note-hive-server.vercel.app'
