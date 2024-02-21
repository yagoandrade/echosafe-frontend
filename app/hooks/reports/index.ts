import { Complaint } from "@/app/reports/components/complaints-table/types";
import { db } from "@/config/firebase";
import { useCurrentUserStore } from "@/store/currentUser";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useReportStore } from "./store";

const useReports = () => {
  const { userData } = useCurrentUserStore();
  const { setComplaints } = useReportStore();
  const { code, linkedSchool, uid } = userData;
  const isSchool = userData.role === "school";

  useEffect(() => {
    onValue(ref(db, `schools/${linkedSchool}/reports`), (snapshot) => {
      if (!snapshot.val()) {
        return;
      }
      const snapshotKeys = Object.keys(snapshot.val()) ?? [];
      const dbComplaints: Complaint[] = [];

      snapshotKeys.map((complaint) => {
        dbComplaints.push({
          ...snapshot.val()[complaint],
          id: complaint,
        });
      });

      const complaints = isSchool
        ? dbComplaints
        : dbComplaints.filter((complaint) => complaint.sender === uid);

      setComplaints(complaints);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, code, linkedSchool]);
};

export default useReports;
