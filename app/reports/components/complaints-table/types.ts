export interface Complaint {
  status: "open" | "under_review" | "resolved" | "waiting";
  details: string;
  classGroup: string;
  /* TODO: So precisamos usar um dos tipos abaixo */
  receivedDate: Date | string;
  category: string;
  username?: string;
  id?: string;
  sender: string;
  files?: string;
}

export interface TableProps {
  title: string;
  subtitle: string;
  complaints: Complaint[];
}
