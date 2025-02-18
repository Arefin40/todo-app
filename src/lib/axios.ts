import axios from "axios";

const axiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

// Global Response Interceptor
axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      if (axios.isAxiosError(error)) {
         if (error.response) {
            console.error("Server Error:", error.response.status, error.response.data);
         } else if (error.request) {
            console.error("No Response Received:", error.request);
         } else {
            console.error("Request Setup Error:", error.message);
         }
      } else {
         console.error("Unexpected Error:", error);
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;
