import { Check, MoreHorizontal, UserSearch } from "lucide-react";
import { Complaint } from "@/app/reports/components/complaints-table/types";

export const statusMappings = {
  open: {
    text: "Em Aberto",
    color: "#000",
    icon: () => <MoreHorizontal size="0.8rem" strokeWidth={3} color="white" />,
  },
  under_review: {
    text: "Em Análise",
    color: "#FACC15",
    icon: () => <UserSearch size="0.7rem" strokeWidth={3} />,
  },
  waiting: {
    text: "Pendente",
    color: "#fd8712",
    icon: () => "!",
  },
  resolved: {
    text: "Resolvido",
    color: "#22C55E",
    icon: () => <Check size="0.8rem" strokeWidth={4} />,
  },
};

type Status = Complaint["status"];

export function getStatusFromCode(status: Status) {
  return statusMappings[status]?.text;
}

export function getColorFromCode(status: Status) {
  return statusMappings[status]?.color;
}

export function getIconFromCode(status: Status) {
  return statusMappings[status]?.icon();
}
