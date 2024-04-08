import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  MoreHorizontal,
  UserSearch,
  X,
} from "lucide-react";

export const labels = [
  {
    value: "racism",
    label: "Racism",
  },
  {
    value: "homophobia",
    label: "Homophobia",
  },
  {
    value: "prejudice",
    label: "Prejudice",
  },
  {
    value: "transphobia",
    label: "Transphobia",
  },
  {
    value: "religious_intolerance",
    label: "Religious Intolerance",
  },
  {
    value: "harassment",
    label: "Harassment",
  },
  {
    value: "capacitism",
    label: "Capacitism",
  },
];

export type Statuses =
  | "open"
  | "under_review"
  | "requires_action"
  | "solved"
  | "cancelled";

export type StatusesObject = Record<
  Statuses,
  {
    value: Statuses;
    label: string;
    color: string;
    icon: () => JSX.Element | string;
  }
>;

export const statuses: StatusesObject = {
  open: {
    value: "open",
    label: "Open",
    color: "#000",
    icon: () => <MoreHorizontal size="0.7rem" strokeWidth={3} color="white" />,
  },
  under_review: {
    value: "under_review",
    label: "Under Review",
    color: "#FACC15",
    icon: () => <UserSearch size="0.7rem" strokeWidth={3} />,
  },
  requires_action: {
    value: "requires_action",
    label: "Requires Action",
    color: "#fd8712",
    icon: () => "!",
  },
  solved: {
    value: "solved",
    label: "Solved",
    color: "#22C55E",
    icon: () => <Check size="0.7rem" strokeWidth={4} />,
  },
  cancelled: {
    value: "cancelled",
    label: "Canceled",
    color: "#f87171",
    icon: () => <X size="0.7rem" strokeWidth={4} />,
  },
};

export type Priorities = "low" | "medium" | "high";

export type PrioritiesObject = Record<
  Priorities,
  {
    label: string;
    value: Priorities;
    icon: React.ComponentType<{ className?: string }>;
  }
>;

export const priorities: PrioritiesObject = {
  low: {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  medium: {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  high: {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
};
