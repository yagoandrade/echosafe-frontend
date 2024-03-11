import axios from "axios";

const useAxios = () => {
  const axiosClient = axios.create({
    baseURL: "https://echosafe-production.up.railway.app",
    responseType: "json",
  });

  return { axios: axiosClient };
};

export default useAxios;
