import { getServerAuthSession } from "@/server/auth";

import Header from "@/components/shared/header";
import LandingPage from "@/components/landing-page";
import { redirect } from "next/navigation";
import Footer from "@/components/shared/footer";
import { cn } from "@/lib/utils";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user && !session.user.isOnboarded) redirect("/onboarding");
  else if (session?.user && session.user.isOnboarded) redirect("/dashboard");

  const pageHeight = "min-h-[calc(100vh-4rem)]";

  return (
    <>
      <Header isLoggedIn={!!session} />
      <main className={cn("flex justify-center", pageHeight)}>
        <div className="container flex flex-col justify-center gap-12 px-12 py-12">
          <LandingPage />
        </div>
      </main>
      <Footer />
    </>
  );
}
