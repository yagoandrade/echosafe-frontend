"use client";

import { useReportStore } from "@/app/hooks/reports/store";
import {
  getColorFromCode,
  getIconFromCode,
  getStatusFromCode,
} from "@/components/report_card/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAxios from "@/hooks/useAxios";
import { useLatestMessageStore } from "@/hooks/useNotificationReceive";
import { useCurrentReportStore } from "@/store/currentReport";
import { useCollaboratorStore } from "@/store/currentUserRoles";
import { Bot } from "lucide-react";
import { useEffect } from "react";

const ReportInfo = () => {
  const { isCollaborator } = useCollaboratorStore();
  const { currentComplaint } = useCurrentReportStore();
  const categories = (currentComplaint?.categories ?? []).join(", ");
  const { latestMessage } = useLatestMessageStore();
  const { axios } = useAxios();
  const formatOrientationAnalysis = (text: string) => {
    if (!text) {
      return;
    }
    const items = text.split("-").filter(Boolean);
    return (
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li
            key={index}
            className={`text-sm text-[#71717A] ${
              index === 0 ? "list-none" : "list-disc"
            }`}
            style={{ marginLeft: index === 0 ? 0 : 24 }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  const getReportByNotification = async () => {
    const { data } = await axios.get(`/reports/${latestMessage.messageId}`);
    useReportStore.getState().setComplaints(data);
  };
  useEffect(() => {
    if (!currentComplaint) {
      getReportByNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentComplaint, latestMessage.messageId]);

  if (!currentComplaint || !latestMessage) {
    return null;
  }

  return currentComplaint && isCollaborator ? (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Chamado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Status</span>
            <span className="text-sm">
              <Badge
                variant={currentComplaint?.status}
                className={`h-fit w-full items-center justify-center gap-x-2 self-center text-base xs:w-fit xs:justify-start sm:text-sm`}
              >
                <span
                  className="flex size-4 items-center justify-center rounded-full text-xs font-black"
                  style={{
                    backgroundColor: getColorFromCode(currentComplaint?.status),
                  }}
                >
                  {getIconFromCode(currentComplaint?.status)}
                </span>
                <p>{getStatusFromCode(currentComplaint?.status)}</p>
              </Badge>
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Denúncia feita em</span>
            <span className="text-sm text-[#71717A]">
              {new Date(currentComplaint?.createdAt ?? "").toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Categoria(s)</span>
            <span className="text-sm text-[#71717A]">{categories}</span>
          </div>
        </div>
        <div>
          <h3 className="font-bold leading-none tracking-tight">
            Descrição da denúncia
          </h3>
          <span className="text-sm text-[#71717A]">
            {currentComplaint?.description}
          </span>
        </div>
        {isCollaborator && (
          <div>
            <span className="flex items-center gap-x-1.5">
              <Bot size="2rem" />
              <h3 className="text-xl font-bold leading-none tracking-tight">
                Relatório da inteligência artificial
              </h3>
            </span>
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-semibold">
                  O que o aluno sentiu com a ofensa
                </span>
                <span className="text-sm text-[#71717A]">
                  {currentComplaint.sentimentAnalysis}
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-sm font-semibold">
                  Em qual categoria de bullying entra a ofensa
                </span>
                <span className="text-sm text-[#71717A]">
                  {currentComplaint.categoryAnalysis}
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-sm font-semibold">
                  Orientações para lidar com essa situação{" "}
                </span>
                <span className="text-sm text-[#71717A]">
                  {formatOrientationAnalysis(
                    currentComplaint.orientationAnalysis
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  ) : null;
};

export default ReportInfo;
