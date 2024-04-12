"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type StatusesObject, statuses } from "@/data/data";
import { type Post } from "@prisma/client";
import { Bot, User } from "lucide-react";

interface ReportInfoProps {
  report: Post;
}

const ReportInfo = ({ report }: ReportInfoProps) => {
  const status = statuses[report.status as keyof StatusesObject];

  return (
    <Card className="h-full min-h-fit overflow-y-auto">
      <CardHeader>
        <CardTitle>Report Information</CardTitle>
      </CardHeader>
      <CardContent className="flex w-fit flex-col gap-y-6 overflow-y-auto">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold">Status</span>
          <span className="mt-4 text-sm">
            <Badge
              variant={status.value}
              className={`xs:w-fit xs:justify-start mb-2 h-fit w-full items-center justify-center gap-x-2 self-center text-base sm:text-sm`}
            >
              <span
                className="flex size-4 items-center justify-center rounded-full text-xs font-black"
                style={{
                  backgroundColor: status.color,
                }}
              >
                {status.icon()}
              </span>
              <p>{status.label}</p>
            </Badge>
          </span>
        </div>

        <div className="flex gap-x-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="flex items-center gap-x-1.5">
                <Bot size="1rem" />
                <h3 className="font-bold leading-none tracking-tight">
                  AI Analysis
                </h3>
              </span>
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
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="flex items-center gap-x-1.5">
                <User size="1rem" />
                <h3 className="font-bold leading-none tracking-tight">
                  Information by User
                </h3>
              </span>

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
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportInfo;
