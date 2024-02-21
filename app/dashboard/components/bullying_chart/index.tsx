import { Card, CardContent } from "@/components/ui/card";
import BullyingDashboard from "../bullying_dashboard";

const BullyingChart = () => {
  return (
    <Card className="h-full">
      <CardContent className="mt-6">
        <BullyingDashboard />
      </CardContent>
    </Card>
  );
};

export default BullyingChart;
