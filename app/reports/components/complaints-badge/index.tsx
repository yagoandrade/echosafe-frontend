import { Badge } from "@/components/ui/badge";
import { Complaint } from "../complaints-table/types";
import { statusLabel, statusToColor } from "../utils";

const ComplaintBadge: React.FC<Pick<Complaint, "status">> = ({ status }) => (
  <Badge className={`py-1 ${statusToColor[status].bg}`}>
    <label className={statusToColor[status].text}>{statusLabel[status]}</label>
  </Badge>
);

export default ComplaintBadge;
