import axios from 'axios';

import create from 'zustand';
import toast from 'react-hot-toast';
const baseUrl = `https://uiti-crm-server.vercel.app`;

const config = {
    headers: {
        'Authorization': `${localStorage.getItem("token")}`,
    },
};
const courseStore = create((set) => ({
    courseCreateApi: async (payload) => {
        let res = await axios.post(`${baseUrl}/course`, payload, config);
        if (res.data.status === "success") {
            return true;
        } else if (res.data.message == "You are not authenticated!") {
            return toast.error('You are not authenticated! Please login first.');
        }
        else {
            return toast.error('Failed to create course');
        }
    },


    allCourseData: [],
    allCourseDataApi: async () => {
        let res = await axios.get(`https://uiti-crm-server.vercel.app/course`);
        if (res.data?.status == "success") {
            
            return set({ allCourseData: res.data.users });
            
        }
        else {
            return toast.error('Failed to fetch course data');
        }
    }




}));


export default courseStore;