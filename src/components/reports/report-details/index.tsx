"use client";

import { api } from "@/trpc/react";
import { type Post } from "@prisma/client";
import { useEffect, useState } from "react";
import ReportInfo from "../report-info";
import ChatBox from "@/components/chat/chatbox";

interface ReportDetailsProps {
  id: string;
}

const ReportDetails = ({ id }: ReportDetailsProps) => {
  const [task, setTask] = useState<Post>({} as Post);

  const getTaskMutation: ReturnType<typeof api.post.getTask.useMutation> =
    api.post.getTask.useMutation();

  const fetchTask = async () => {
    try {
      const task = await getTaskMutation.mutateAsync({ id: Number(id) });
      if (task) setTask(task);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  useEffect(() => {
    void fetchTask();
  }, []);

  return (
    <div className="flex gap-9">
      <ChatBox />
      {!task.id && <p>Task not found</p>}
      {!!task.id && <ReportInfo report={task} />}
    </div>
  );
};

export default ReportDetails;
