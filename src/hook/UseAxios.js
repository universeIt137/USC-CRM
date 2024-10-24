import axios from 'axios';

// const backendUrl = `http://localhost:5500`;
const backendUrl = `https://uiti-crm-server.vercel.app/`;


const axiosPublic = axios.create({
    baseURL: backendUrl
})

const useAxiosPublic = () => {
    return axiosPublic;
}


export default useAxiosPublic;