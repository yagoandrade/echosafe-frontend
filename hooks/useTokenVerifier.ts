import { useReportStore } from "@/app/hooks/reports/store";
import { useCurrentUserStore } from "@/store/currentUser";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useAxios from "./useAxios";

const useTokenVerifier = () => {
  const { axios } = useAxios();
  const [cookie] = useCookies();
  const { setUserData } = useCurrentUserStore();
  const { setComplaints } = useReportStore();

  const verifyTokenExistence = () => {
    return cookie.access_token ?? cookie.refresh_token ?? null;
  };

  const getUserData = async (token: string) => {
    const { id } = jwtDecode(token) as { id: string };
    const user = await axios.get(`/users/${id}`);
    setUserData(user.data);
    setComplaints(user.data.reports);
  };

  const execute = () => {
    const token = verifyTokenExistence();
    if (!token) {
      return;
    }

    getUserData(token);
  };
  useEffect(() => {
    execute();
  }, []);
};

export default useTokenVerifier;
