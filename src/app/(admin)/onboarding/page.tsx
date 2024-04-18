import { getServerAuthSession } from "@/server/auth";
import Onboarding from "./components/onboarding";
import { redirect } from "next/navigation";
import { getUserSubscriptionPlan } from "@/lib/subscription";

const OnboardingPage = async () => {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.email!);
  if (!subscriptionPlan.isPaid || !subscriptionPlan.stripeCustomerId)
    redirect("/pricing");

  const pageHeight = !session ? "min-h-[calc(100vh-4rem)]" : "min-h-screen";

  return (
    <main className={`flex justify-center text-white ${pageHeight}`}>
      <div className="container flex flex-col gap-12 px-4 py-12">
        <Onboarding />
      </div>
    </main>
  );
};

export default OnboardingPage;
