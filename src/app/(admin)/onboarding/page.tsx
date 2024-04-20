import { getServerAuthSession } from "@/server/auth";
import Onboarding from "./components/onboarding";
import { redirect } from "next/navigation";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Onboarding | EchoSafe®",
  description: "Onboard your institution to EchoSafe.",
};

const OnboardingPage = async () => {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.email!);
  if (!subscriptionPlan.isPaid || !subscriptionPlan.stripeCustomerId)
    redirect("/pricing");

  return (
    <main
      className={cn(
        "flex min-h-screen justify-center text-white" +
          "container flex flex-col gap-12 px-4 py-12",
      )}
    >
      <Onboarding />
    </main>
  );
};

export default OnboardingPage;
