export interface Complaint {
  status: "open" | "under_review" | "resolved" | "waiting";
  description: string;
  classGroup?: string;
  victim?: boolean;
  endosers: string[];
  /* TODO: So precisamos usar um dos tipos abaixo */
  receivedDate?: Date | string;
  categories: string[];
  username?: string;
  id?: string;
  details?: string;
  sender?: string;
  files?: string;
  userId: string;
  createdAt?: Date;
  categoryAnalysis: string;
  sentimentAnalysis: string;
  orientationAnalysis: string;
}

export interface TableProps {
  title: string;
  subtitle: string;
  complaints: Complaint[];
}
