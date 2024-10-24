
import create from 'zustand';
import toast from 'react-hot-toast';
import axios from 'axios';


const baseUrl = `https://uiti-crm-server.vercel.app`

const config = {
    headers: {
        'Authorization': `${localStorage.getItem("token")}`,
    },
}

const authStore = create((set) => ({
    userCreateApi: async (payload) => {
        let res = await axios.post(`${baseUrl}/users`,payload,config);
        if(res) {
            return toast.success('User created successfully');
        }
    },
    userLoginApi: async (payload) => {
        try {
            const res = await axios.post(`${baseUrl}/login`,payload);
            if (res.data["status"] === "success") {
                localStorage.setItem("token", `${res.data.token}`);
                return toast.success('Logged in successfully');
            }
        } catch (error) {
            toast.error('Failed to login');
        }
    }
}));

export default authStore;