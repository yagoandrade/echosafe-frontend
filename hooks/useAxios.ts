import axios from "axios";
 
const useAxios = () => {
  const axiosClient = axios.create({
    baseURL: process.env.BACKEND_BASE_URL,
    responseType: "json",
  });

  return { axios: axiosClient };
};

export default useAxios;
