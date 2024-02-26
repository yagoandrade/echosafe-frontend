import axios from "axios";
const useAxios = () => {
  const axiosClient = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json",
  });

  return { axios: axiosClient };
};

export default useAxios;
