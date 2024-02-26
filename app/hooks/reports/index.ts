import { Complaint } from "@/app/reports/components/complaints-table/types";
import { FormFields } from "@/app/reports/create/components/complaint-form";
import useAxios from "@/hooks/useAxios";
import { useCurrentUserStore } from "@/store/currentUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useReports = () => {
  const { userData } = useCurrentUserStore();
  const [loading, setLoading] = useState(false);
  const { code, linkedSchool, id, reports } = userData;
  const { axios } = useAxios();
  console.log(userData);
  const isSchool = userData.role === "school";
  console.log(id, "user id", userData);

  const redirect = () => {
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 1000);
  };

  const getUserReports = async () => {
    console.log(reports, "user reports");
  };

  const sendReport = async (formData: FormFields) => {
    const complaint: Complaint = {
      description: formData.description,
      categories: formData.categories,
      userId: id,
      status: "open",
      endosers: formData.endosers,
      victim: formData.victim,
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
    getUserReports();
  }, []);

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

  return { getUserReports, sendReport, loading };
};

export default useReports;
