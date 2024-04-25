import "@/styles/globals.css";

import { Toaster } from "sonner";
import localFont from "next/font/local";

import Providers from "./_components/providers";
import { TRPCReactProvider } from "@/trpc/react";
import { ActiveInstitutionStoreProvider } from "@/providers/activeInstitutionStoreProvider";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";

const soehne = localFont({
  src: "../../public/assets/fonts/soehne/soehne-var.woff2",
  display: "swap",
  variable: "--font-soehne",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title:
    "EchoSafe® - Combating Bullying in Schools, Universities and Your Institution | Secure Platform for Reporting, Analysis and More #SchoolsOfTomorrow",
  description:
    "EchoSafe® is an innovative solution to combat bullying and harassment in schools and universities, offering a secure platform for reporting and in-depth analysis. We ensure privacy, make it easier to identify bullying, provide comprehensive analytics, and create a safer environment.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://echosafe.org/" />
        <meta
          property="og:title"
          content="EchoSafe® - Combating Bullying in Schools, Universities and Your
          Institution | Secure Platform for Reporting, Analysis and More
          #SchoolsOfTomorrow"
        />
        <meta
          property="og:description"
          content="EchoSafe® is an innovative solution to combat bullying and harassment in schools and universities, offering a secure platform for reporting and in-depth analysis. We ensure privacy, make it easier to identify bullying, provide comprehensive analytics, and create a safer environment."
        />
        <meta
          property="og:image"
          content="/assets/images/background-echosafe.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://echosafe.org/" />
        <meta
          property="twitter:title"
          content="EchoSafe® - Combating Bullying in Schools, Universities and Your
          Institution | Secure Platform for Reporting, Analysis and More #SchoolOfTomorrow"
        />
        <meta
          property="twitter:description"
          content="EchoSafe® is an innovative solution to combat bullying and harassment in schools and universities, offering a secure platform for reporting and in-depth analysis. We ensure privacy, make it easier to identify bullying, provide comprehensive analytics, and create a safer environment."
        />
        <meta
          property="twitter:image"
          content="/assets/background-echosafe.png"
        />
        <meta
          name="keywords"
          content="EchoSafe, school bullying, reporting, analytics, school safety, inclusive environment, student privacy, anti-bullying tools, bullying data, school reports, university bullying, saas, artificial intelligence, machine learning, anti-harassment tools, university, academic, school, technology, tech"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/icons/site.webmanifest" />
        <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#1994ff" />
        <meta
          name="msapplication-config"
          content="/assets/icons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={cn(
          "light",
          soehne.className,
        )}
      >
        <TRPCReactProvider>
          <ActiveInstitutionStoreProvider>
            <Providers>
              <Toaster />
              {children}
            </Providers>
          </ActiveInstitutionStoreProvider>
        </TRPCReactProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
