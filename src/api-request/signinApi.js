
import { create } from 'zustand';

import toast from 'react-hot-toast';
import axios from 'axios';
// import useAxiosPublic from './../hook/UseAxios';
// const axiosPublic = useAxiosPublic();

const baseUrl = `https://uiti-crm-server.vercel.app`

export const userLoginApi = async (payload) => {
    try {
        const res = await axios.post(`${baseUrl}/login`, payload);
        if (res.data["status"] === "success") {
            localStorage.setItem("token", `${res.data.token}`);
            return toast.success('Logged in successfully');
        }
    } catch (error) {
        toast.error('Failed to login');
    }
}

// const signInStore = create((set) => ({
//     userCreateApi: async (payload) => {
//         try {
//             const res = await axios.post(`${baseUrl}/users`, payload);
//             if (res) {
//                 toast.success('User created successfully');
//             }
//         } catch (error) {
//             toast.error('Failed to create user');
//         }
//     },
//     userLoginApi: async (payload) => {
//         try {
//             const res = await axios.post(`${baseUrl}/login`, payload);
//             if (res.data["status"] === "success") {
//                 localStorage.setItem("token", `${res.data.token}`);
//                 return toast.success('Logged in successfully');
//             }
//         } catch (error) {
//             toast.error('Failed to login');
//         }
//     }
// }));

// export default signInStore;