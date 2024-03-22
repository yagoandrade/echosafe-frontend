import { useReportStore } from "@/app/hooks/reports/store";
import useTeams from "@/app/teams/hooks/useTeams";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { useCurrentUserStore } from "@/store/currentUser";
import { useCollaboratorStore } from "@/store/currentUserRoles";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useAxios from "./useAxios";

const useTokenVerifier = () => {
  const { axios } = useAxios();
  const [cookie] = useCookies();
  const { setUserData, userData } = useCurrentUserStore();
  const { setComplaints } = useReportStore();
  const { currentSchoolId, setCurrentSchool, currentSchool } =
    useCurrentSchoolStore();
  const { verifyTeamRole } = useTeams();
  const { isCollaborator } = useCollaboratorStore();

  const verifyTokenExistence = () => {
    return cookie.access_token ?? null;
  };

  const getUserData = async (token: string) => {
    const { id } = jwtDecode(token) as { id: string };
    const user = await axios.get(`/users/${id}`);
    console.log(userData, "userdata");
    setUserData(user.data);
  };

  const getSchoolData = async () => {
    let schoolData;
    if (currentSchoolId) {
      const { data } = await axios.get(`/school/${currentSchoolId}`);
      schoolData = data;
      verifyTeamRole(currentSchoolId);
    } else {
      const { data } = await axios.get(`/school/${cookie.persisted_id_school}`);
      schoolData = data;
      verifyTeamRole(cookie.persisted_id_school);
    }
    console.log(schoolData, "dados");
    setCurrentSchool(schoolData);
  };

  const getUserReports = async () => {
    console.log(currentSchool.reports);
    if (!currentSchool.reports) {
      return;
    }
    if (isCollaborator) {
      setComplaints(currentSchool.reports);
    } else {
      const schoolReportIds = new Set(
        currentSchool.reports.map((report) => report.id)
      );
      console.log(userData.reports);
      const userSchoolComplaints = userData.reports.filter((report) =>
        schoolReportIds.has(report.id)
      );
      setComplaints(userSchoolComplaints);
    }
  };

  const execute = () => {
    const token = verifyTokenExistence();
    if (!token) {
      return;
    }
    getUserData(token);
    if (!currentSchoolId && !cookie.persisted_id_school) {
      return;
    }
    getSchoolData();
  };

  useEffect(() => {
    execute();
  }, [currentSchool.id, cookie.access_token]);

  useEffect(() => {
    getUserReports();
  }, [currentSchool.code]);

  return { getUserData, verifyTokenExistence };
};

export default useTokenVerifier;
