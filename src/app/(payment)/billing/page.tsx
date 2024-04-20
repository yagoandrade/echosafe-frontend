import { redirect } from "next/navigation";

import { getUserSubscriptionPlan } from "@/lib/subscription";
import { BillingInfo } from "@/components/billing-info";
import { DashboardShell } from "@/components/dashboard/shell";
import { getServerAuthSession } from "@/server/auth";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Billing | EchoSafe®",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.email!);

  return (
    <main className={cn("flex min-h-screen justify-center")}>
      <Sidemenu />

      <section className="w-full p-8">
        <div className="grid gap-8">
          {/* TODO: Use this space to tell an user if their plan is about to expire or if they need to update their payment method.

          <Alert className="!pl-14">
            <FileWarning />
            <AlertTitle>This is a demo app.</AlertTitle>
            <AlertDescription>
              SaaS Starter app is a demo app using a Stripe test environment.
              You can find a list of test card numbers on the{" "}
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
          </Alert> */}
          <BillingInfo subscriptionPlan={subscriptionPlan} />
        </div>
      </section>
    </main>
  );
}
