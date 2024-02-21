import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>
          EchoSafe - Combate ao Bullying Escolar | Plataforma Segura para
          Denúncias e Análises
        </title>
        <meta
          name="title"
          content="EchoSafe - Combate ao Bullying Escolar | Plataforma Segura para Denúncias e Análises"
        />
        <meta
          name="description"
          content="O EchoSafe é uma solução inovadora para combater o bullying escolar, oferecendo uma plataforma segura para denúncias e análises detalhadas. Garantimos privacidade, facilitamos a identificação do bullying, fornecemos análises abrangentes e criamos um ambiente escolar mais seguro e inclusivo. Conheça nossas funcionalidades e marcos."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://echosafe.org/" />
        <meta
          property="og:title"
          content="EchoSafe - Combate ao Bullying Escolar | Plataforma Segura para Denúncias e Análises"
        />
        <meta
          property="og:description"
          content="O EchoSafe é uma solução inovadora para combater o bullying escolar, oferecendo uma plataforma segura para denúncias e análises detalhadas. Garantimos privacidade, facilitamos a identificação do bullying, fornecemos análises abrangentes e criamos um ambiente escolar mais seguro e inclusivo. Conheça nossas funcionalidades e marcos."
        />
        <meta property="og:image" content="/assets/background-echosafe.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://echosafe.org/" />
        <meta
          property="twitter:title"
          content="EchoSafe - Combate ao Bullying Escolar | Plataforma Segura para Denúncias e Análises"
        />
        <meta
          property="twitter:description"
          content="O EchoSafe é uma solução inovadora para combater o bullying escolar, oferecendo uma plataforma segura para denúncias e análises detalhadas. Garantimos privacidade, facilitamos a identificação do bullying, fornecemos análises abrangentes e criamos um ambiente escolar mais seguro e inclusivo. Conheça nossas funcionalidades e marcos."
        />
        <meta
          property="twitter:image"
          content="/assets/background-echosafe.png"
        />
        <meta
          name="keywords"
          content="EchoSafe, bullying escolar, denúncias, análises, segurança escolar, ambiente inclusivo, privacidade do aluno, ferramentas anti-bullying, dados de bullying, relatórios escolares"
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
        <meta name="msapplication-TileColor" content="#9f00a7" />
        <meta
          name="msapplication-config"
          content="/assets/icons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-w-screen relative min-h-screen bg-[#fafafb]" style={inter.style}>
        <AuthContextProvider>
          <Header />
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </AuthContextProvider>
      </body>
    </html>
  );
}
