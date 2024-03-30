import { Check, MoreHorizontal, UserSearch } from "lucide-react";

export type Status = "open" | "under_review" | "waiting" | "resolved";

type StatusMappings = {
  [key in Status]: {
    text: string;
    color: string;
    icon: () => JSX.Element | string;
  };
};

export const statusMappings: StatusMappings = {
  open: {
    text: "Open",
    color: "#000",
    icon: () => <MoreHorizontal size="0.8rem" strokeWidth={3} color="white" />,
  },
  under_review: {
    text: "Under Review",
    color: "#FACC15",
    icon: () => <UserSearch size="0.7rem" strokeWidth={3} />,
  },
  waiting: {
    text: "Requires Action",
    color: "#fd8712",
    icon: () => "!",
  },
  resolved: {
    text: "Solved",
    color: "#22C55E",
    icon: () => <Check size="0.8rem" strokeWidth={4} />,
  },
};

export function getStatusFromCode(status: Status): string {
  return statusMappings[status].text;
}

export function getColorFromCode(status: Status): string {
  return statusMappings[status].color;
}

export function getIconFromCode(status: Status): JSX.Element | string {
  return statusMappings[status].icon();
}
