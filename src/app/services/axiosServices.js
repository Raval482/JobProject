
import axios from 'axios'
import { toast } from 'react-toastify';

const axiosService = axios.create({
    baseURL: "http://192.168.54.43:3000/api",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})




axiosService.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response) {
          toast.error(error?.response?.data?.message)
        }
        else {
            toast.error( error.message);
        }
    }
);



export default axiosService