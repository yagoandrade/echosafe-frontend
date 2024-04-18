import { redirect } from "next/navigation";

import { getUserSubscriptionPlan } from "@/lib/subscription";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BillingInfo } from "@/components/billing-info";
import { DashboardShell } from "@/components/dashboard/shell";
import { getServerAuthSession } from "@/server/auth";
import { FileWarning } from "lucide-react";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.email!);

  return (
    <DashboardShell>
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <FileWarning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            SaaS Starter app is a demo app using a Stripe test environment. You
            can find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
        <BillingInfo subscriptionPlan={subscriptionPlan} />
      </div>
    </DashboardShell>
  );
}
