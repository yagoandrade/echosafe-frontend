import { useReportStore } from "@/app/hooks/reports/store";
import useTeams from "@/app/teams/hooks/useTeams";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { useCurrentUserStore } from "@/store/currentUser";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useTokenVerifier = () => {
  const { axios } = useAxios();
  const { setUserData, userData } = useCurrentUserStore();
  const { setComplaints } = useReportStore();
  const { currentSchoolId, setCurrentSchool, currentSchool } =
    useCurrentSchoolStore();
  const { verifyTeamRole } = useTeams();

  const [accessToken, setAccessToken] = useState("");
  const [persistedIdSchool, setPersistedIdSchool] = useState("");
  const [isCollaborator, setIsCollaborator] = useState(false);

  const verifyTokenExistence = () => {
    return accessToken ?? null;
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
      const { data } = await axios.get(`/school/${persistedIdSchool}`);
      schoolData = data;
      verifyTeamRole(persistedIdSchool);
    }
    console.log(schoolData, "dados");
    setCurrentSchool(schoolData);
  };

  const getUserReports = async () => {
    console.log(currentSchool.reports, "reports d escola", isCollaborator);
    if (!currentSchool.reports) {
      return;
    }
    if (isCollaborator) {
      setComplaints(currentSchool.reports);
    } else {
      const schoolReportIds = new Set(
        currentSchool.reports.map((report) => report.id)
      );
      const userSchoolComplaints = userData?.reports?.filter((report) =>
        schoolReportIds.has(report.id)
      );
      setComplaints(userSchoolComplaints ?? []);
    }
  };

  const execute = () => {
    const token = verifyTokenExistence();
    if (!token) {
      return;
    }
    getUserData(token);
    if (!currentSchoolId && !persistedIdSchool) {
      return;
    }
    getSchoolData();
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const persisted_id_school =
      localStorage.getItem("persisted_id_school") ?? "";
    const is_collaborator = localStorage.getItem("is_collaborator");
    setAccessToken(access_token ?? "");
    setPersistedIdSchool(persisted_id_school ?? "");
    setIsCollaborator(is_collaborator?.length ? true : false);
  }, []);

  useEffect(() => {
    execute();
  }, [currentSchool.id, accessToken, persistedIdSchool, userData.id]);

  useEffect(() => {
    getUserReports();
  }, [currentSchool.code]);

  return { getUserData, verifyTokenExistence, getUserReports };
};

export default useTokenVerifier;
