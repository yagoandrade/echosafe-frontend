import { api } from "@/trpc/server";
import ReportInfo from "../report-info";
import ChatBox from "@/components/chat/chatbox";
import { getServerAuthSession } from "@/server/auth";

interface ReportDetailsProps {
  id: string;
}

const ReportDetails = async ({ id }: ReportDetailsProps) => {
  const session = await getServerAuthSession();

  const task = await api.post.getTask({ id: Number(id) });
  const role = await api.post.getUserRole();

  return task ? (
    <div className="grid max-h-[70vh] w-full grid-cols-6 gap-9 overflow-hidden">
      <div className="col-span-4">
        <ChatBox
          channelId={Number(id)}
          currentUser={session?.user}
          userRole={role ?? ""}
        />
      </div>
      <div className="col-span-2 h-full">
        <ReportInfo report={task} userRole={role ?? ""} />
      </div>
    </div>
  ) : (
    <p>Report not found.</p>
  );
};

export default ReportDetails;
