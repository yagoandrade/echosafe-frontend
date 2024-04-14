import { api } from "@/trpc/server";
import ReportInfo from "../report-info";
import ChatBox from "@/components/chat/chatbox";
import { createClient } from "@/lib/supabase/server";
import { getServerAuthSession } from "@/server/auth";

interface ReportDetailsProps {
  id: string;
}

const ReportDetails = async ({ id }: ReportDetailsProps) => {
  const session = await getServerAuthSession();

  const task = await api.post.getTask({ id: Number(id) });

  return task ? (
    <div className="flex gap-9">
      <ChatBox channelId={Number(id)} currentUser={session?.user} />
      <ReportInfo report={task} />
    </div>
  ) : (
    <p>Report not found.</p>
  );
};

export default ReportDetails;
