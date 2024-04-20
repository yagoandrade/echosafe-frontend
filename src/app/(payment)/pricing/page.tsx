import { PricingCards } from "@/components/pricing-cards";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Pricing | EchoSafe®",
};

export default async function PricingPage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.email!);

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8 h-screen bg-transparent">
      <PricingCards
        userEmail={session?.user.email}
        subscriptionPlan={subscriptionPlan}
      />
      {/* <hr className="container" />
      <PricingFaq /> */}
    </div>
  );
}
