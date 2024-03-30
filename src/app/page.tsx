import { getServerAuthSession } from "@/server/auth";

import Header from "@/components/header";
import Sidemenu from "@/components/sidemenu";
import LandingPage from "@/components/landing-page";
import Dashboard from "@/components/dashboard";

export default async function Home() {
  const session = await getServerAuthSession();

  const pageHeight = !session?.user.name
    ? "min-h-[calc(100vh-4rem)]"
    : "min-h-screen";

  return (
    <>
      {!session && <Header />}
      <main className={`flex justify-center text-white ${pageHeight}`}>
        {session && <Sidemenu />}
        <div className="container flex flex-col justify-center gap-12 px-4 py-12">
          {session ? <Dashboard /> : <LandingPage />}
        </div>
      </main>
    </>
  );
}
