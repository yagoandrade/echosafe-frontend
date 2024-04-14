"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { type StatusesObject, statuses, type Statuses } from "@/data/data";
import { api } from "@/trpc/react";
import { type Post } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface ReportInfoProps {
  report: Post;
  userRole: string;
}

const ReportInfo = ({ report, userRole }: ReportInfoProps) => {
  const [statusValue, setStatusValue] = useState(
    statuses[report.status as keyof StatusesObject].value,
  );

  const updateReport = api.post.updateTask.useMutation();

  const handleUpdateStatus = async (newStatus: Statuses) => {
    try {
      updateReport.mutate({
        id: Number(report.id),
        status: newStatus,
      });

      toast.success(`Report status updated to "${statuses[newStatus].label}"`);
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };

  return (
    /* TODO: Check why h-[100vh] is the only value to make it take up all the available space. Grid class maybe? */
    <Card className="h-screen w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Report Information</CardTitle>
      </CardHeader>
      <CardContent className="flex w-fit flex-col gap-y-6">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold">Status</span>

          <span className="mt-4 text-sm">
            {userRole === "STUDENT" ? (
              <Badge
                variant={statuses[statusValue].value}
                className={`xs:w-fit xs:justify-start mb-2 h-fit w-full items-center justify-center gap-x-2 self-center text-base sm:text-sm`}
              >
                <span
                  className="flex size-4 items-center justify-center rounded-full text-xs font-black"
                  style={{
                    backgroundColor: statuses[statusValue].color,
                  }}
                >
                  {statuses[statusValue].icon()}
                </span>
                <p>{statuses[statusValue].label}</p>
              </Badge>
            ) : (
              <Select
                value={statusValue}
                onValueChange={(value) => {
                  handleUpdateStatus(value as keyof StatusesObject)
                    .then(() => {
                      setStatusValue(value as keyof StatusesObject);
                    })
                    .catch(() => {
                      toast.error(
                        "There was an error updating the status of the report. Please try again later.",
                      );
                    });
                }}
              >
                <Badge
                  variant={statuses[statusValue].value}
                  className={`xs:w-fit xs:justify-start mb-2 h-fit w-full items-center justify-center gap-x-2 self-center text-base sm:text-sm`}
                >
                  <SelectTrigger
                    id="status"
                    aria-label="Select status"
                    className="[&>span]:line-clamp-0 m-0 size-full border-0 p-0"
                  >
                    <span
                      className="flex size-4 items-center justify-center rounded-full text-xs font-black"
                      style={{
                        backgroundColor: statuses[statusValue].color,
                      }}
                    >
                      {statuses[statusValue].icon()}
                    </span>
                    <p>{statuses[statusValue].label}</p>
                  </SelectTrigger>
                </Badge>
                <SelectContent>
                  {Object.values(statuses).map((status) => (
                    <SelectItem value={status.value} key={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </span>
        </div>

        <div className="flex h-full flex-col gap-y-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold">Report made in</span>
              <span className="text-sm text-[#71717A]">
                {new Date(report.updatedAt ?? "").toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold">Category</span>
              <span className="text-sm text-[#71717A]">{report.label}</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Description</h3>
              <span className="text-sm text-[#71717A]">
                {report.description}
              </span>
            </div>
          </div>
          {userRole !== "STUDENT" && (
            <div className="h-full space-y-4 overflow-y-scroll">
              <div className="flex flex-col space-y-1">
                <div className="grid grid-cols-1 gap-4 py-4">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold">
                      What the victim is feeling
                    </span>
                    <span className="text-sm text-[#71717A]">
                      {report.AISentimentAnalysis}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold">
                      In what context this situation is happening
                    </span>
                    <span className="text-sm text-[#71717A]">
                      {report.AITypeOfBullying}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold">
                      How to help the victim
                    </span>
                    <span className="text-sm text-[#71717A]">
                      {report.AIActionRecommendations}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportInfo;
