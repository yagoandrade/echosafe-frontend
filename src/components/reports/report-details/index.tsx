import { api } from "@/trpc/server";
import ReportInfo from "../report-info";
import ChatBox from "@/components/chat/chatbox";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface ReportDetailsProps {
  id: string;
}

const ReportDetails = async ({ id }: ReportDetailsProps) => {
  const session = await getServerAuthSession();

  const role = await api.post.getUserRole();
  const task = await api.post.getTask({ id: Number(id) }).catch((err) => {
    const errorMessage = (err as Error).message;

    if (
      errorMessage === "You must be part of the institution to view this report"
    )
      redirect("/reports");

    toast.error(errorMessage);
  });

  return task ? (
    <div className="grid size-full grid-cols-1 gap-3 lg:grid-cols-6 lg:gap-9">
      <div className="col-span-1 lg:col-span-4">
        <ChatBox
          channelId={Number(id)}
          currentUser={session?.user}
          userRole={role ?? ""}
        />
      </div>
      <div className="col-span-1 h-full lg:col-span-2">
        <ReportInfo report={task} userRole={role ?? ""} />
      </div>
    </div>
  ) : (
    <p>Report not found.</p>
  );
};

export default ReportDetails;
