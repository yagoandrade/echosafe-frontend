import { Complaint } from "@/app/reports/components/complaints-table/types";
import { db } from "@/config/firebase";
import { useCurrentUserStore } from "@/store/currentUser";
import { push, ref } from "firebase/database";
import { useState } from "react";
import { toast } from "sonner";

const useComplaintSubmitForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useCurrentUserStore();
  const { uid, linkedSchool } = userData;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const complaint: Complaint = {
      details: data.details,
      receivedDate: new Date().toUTCString(),
      category: JSON.stringify(data.categories),
      files: JSON.stringify(data.files),
      classGroup: "3 B",
      sender: uid,
      status: "open",
    };

    await push(ref(db, `schools/${linkedSchool}/reports`), complaint);
    toast.message("Denúncia enviada com sucesso!");
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1000);
  };

  return { onSubmit, isLoading };
};

export default useComplaintSubmitForm;
