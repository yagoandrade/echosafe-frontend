import { getServerAuthSession } from "@/server/auth";
import Onboarding from "./components/onboarding";

const OnboardingPage = async () => {
  const session = await getServerAuthSession();

  const pageHeight = !session ? "min-h-[calc(100vh-4rem)]" : "min-h-screen";

  return (
    <main className={`flex justify-center text-white ${pageHeight}`}>
      <div className="container flex flex-col gap-12 px-4 py-12">
        {session && <Onboarding />}
      </div>
    </main>
  );
};

export default OnboardingPage;
