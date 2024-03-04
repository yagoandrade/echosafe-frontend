import { Complaint } from "@/app/reports/components/complaints-table/types";
import { FormFields } from "@/app/reports/create/components/complaint-form";
import useAxios from "@/hooks/useAxios";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { useCurrentUserStore } from "@/store/currentUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useReportStore } from "./store";

const useReports = () => {
  const { userData } = useCurrentUserStore();
  const [loading, setLoading] = useState(false);
  const { code, linkedSchool, id, reports } = userData;
  const { axios } = useAxios();
  const { currentSchool } = useCurrentSchoolStore();
  const { setComplaints } = useReportStore();

  const isSchool = userData.role === "school";

  const redirect = () => {
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 1000);
  };

  const sendReport = async (formData: FormFields) => {
    const complaint: Complaint & { schoolId: string } = {
      description: formData.description,
      categories: formData.categories,
      userId: id,
      status: "open",
      endosers: formData.endosers,
      victim: formData.victim,
      schoolId: currentSchool.id,
    };

    setLoading(true);

    const { status } = await axios.post("/reports", complaint);

    if (status !== 201) {
      toast.message("Houve um erro ao enviar a denúncia.");
      return;
    }

    redirect();
    toast.message("Denúncia enviada com sucesso!");
  };

  useEffect(() => {
    // onValue(ref(db, `schools/${linkedSchool}/reports`), (snapshot) => {
    //   if (!snapshot.val()) {
    //     return;
    //   }
    //   const snapshotKeys = Object.keys(snapshot.val()) ?? [];
    //   const dbComplaints: Complaint[] = [];
    //   snapshotKeys.map((complaint) => {
    //     dbComplaints.push({
    //       ...snapshot.val()[complaint],
    //       id: complaint,
    //     });
    //   });
    //   const complaints = isSchool
    //     ? dbComplaints
    //     : dbComplaints.filter((complaint) => complaint.sender === uid);
    //   setComplaints(complaints);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, linkedSchool]);

  return { sendReport, loading };
};

export default useReports;
