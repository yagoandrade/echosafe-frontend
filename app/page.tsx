import Image from "next/image";
import localFont from "next/font/local";
import LightLogo from "../public/assets/svg/light-logo.svg";

import LandingPageImage1 from "@/public/assets/images/landing-page-image-1.png";
import LandingPageImage2 from "@/public/assets/images/landing-page-image-2.png";
import LandingPageImage3 from "@/public/assets/images/landing-page-image-3.png";

import TwitterSvg from "@/public/assets/svg/twitter.svg";

import { InfiniteMovingCards } from "@/components/infinite_moving_cards";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LandingPageGradientBackground from "@/components/landing_page_gradient_background";
import { Button } from "@/components/button";
import { ChevronRight } from "lucide-react";
import { LandingPageAccordion } from "@/components/landing_page_accordion";
import LandingPagePlatformFeatures from "@/components/landing_page_platform_features";
import Link from "next/link";
import LandingPageSecondaryFeatures from "@/components/landing_page_secondary_features";

const soehne = localFont({
  src: "../public/assets/fonts/soehne/soehne-var.woff2",
  display: "swap",
});

const recoletaBlack = localFont({
  src: "../public/assets/fonts/recoleta/recoleta-black.woff2",
  display: "swap",
});

export default function Home() {
  return (
    <>
      <LandingPageGradientBackground />
      <main
        className="space-y-20 px-6 py-12 sm:px-12 sm:py-20 xl:px-32 2xl:px-80"
        style={soehne.style}
      >
        <section className="grid grid-cols-1 items-center gap-4 lg:grid-cols-12">
          <div className="col-span-6 space-y-6 opacity-90">
            <h1>
              <span className="text-5xl font-semibold sm:text-7xl">
                Segurança escolar, reinventada para{" "}
              </span>
              <span
                className="text-5xl sm:text-7xl"
                style={recoletaBlack.style}
              >
                estudantes
              </span>
            </h1>
            <p className="font-base text-lg text-[#425466] md:text-xl">
              Junte-se à missão da EchoSafe® para criar espaços de aprendizado
              seguros e inclusivos. Com nossas ferramentas avançadas, não apenas
              detecte o bullying, mas também atue de forma eficaz para
              preveni-lo. Identifique os sinais, mitigue os riscos e seja
              proativo na proteção de cada aluno.
            </p>
            <div className="space-y-2 lg:space-x-3 lg:space-y-0">
              <Button variant="black" className="w-full lg:w-fit">
                Comece agora
                <ChevronRight size="1rem" strokeWidth="0.2rem" />
              </Button>
              <Button variant="link" className="w-full lg:w-fit">
                Converse com a nossa equipe
                <ChevronRight size="1rem" strokeWidth="0.2rem" />
              </Button>
            </div>
          </div>
          <div className="hidden lg:col-span-6 lg:flex">
            <Image
              src={LandingPageImage1}
              alt="EchoSafe.org"
              draggable={false}
            />
          </div>
        </section>
        {/*
        TODO: Adicionar isso quando tivermos depoimentos

        <section>
          <Card className="space-y-3 rounded-3xl">
            <CardHeader className="text-center mt-4">
              <CardTitle
                className="text-3xl font-bold"
                style={recoletaBlack.style}
              >
                Faz parte da segurança das instituições
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            </CardContent>
          </Card>
        </section> */}
        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2
              className="text-3xl font-semibold sm:text-6xl"
              style={recoletaBlack.style}
            >
              Nós apoiamos estudantes, não importa o que estejam passando
            </h2>
            <LandingPageAccordion />
          </div>
          <div className="hidden lg:flex">
            <Image
              src={LandingPageImage2}
              alt="EchoSafe.org"
              draggable={false}
            />
          </div>
        </section>
        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="hidden lg:flex">
            <Image
              src={LandingPageImage3}
              alt="EchoSafe.org"
              draggable={false}
            />
          </div>
          <div className="space-y-6">
            <h3
              className="text-3xl font-semibold sm:text-6xl"
              style={recoletaBlack.style}
            >
              Receba denúncias de bullying sem esforço
            </h3>
            <p className="font-base text-lg text-[#425466] md:text-xl">
              Transforme sua escola em um espaço de segurança e inclusão. A
              EchoSafe® oferece as ferramentas necessárias para detectar e
              combater o bullying proativamente.
            </p>
            <p className="font-base text-lg text-[#425466] md:text-xl">
              Cadastre sua escola na EchoSafe® e lidere o caminho para um futuro
              de segurança e bem-estar na educação.
            </p>
            <div className="space-x-3">
              <Button variant="primary" size="fullWidth">
                Veja um vídeo de demonstração
              </Button>
            </div>
          </div>
        </section>
        <section className="space-y-10 text-center">
          <h3
            className="text-3xl font-semibold sm:text-6xl"
            style={recoletaBlack.style}
          >
            O que a EchoSafe® oferta?
          </h3>
          <LandingPagePlatformFeatures />
        </section>
        <section>
          <LandingPageSecondaryFeatures />
        </section>
      </main>
      <article className="relative z-10 hidden lg:flex">
        <div className="mx-12 -mb-12 flex items-center justify-between rounded-xl bg-[#A0DE6F] px-12 py-8 xl:mx-60">
          <h6 className="pr-12 text-3xl" style={recoletaBlack.style}>
            Adote o EchoSafe na sua instituição e tenha o futuro da segurança
            escolar nas suas mãos
          </h6>
          <Button variant="black" className="w-full lg:w-fit xl:-mr-32">
            Comece agora
            <ChevronRight size="1rem" strokeWidth="0.2rem" />
          </Button>
        </div>
      </article>
      <footer
        className="z-1 flex flex-col space-y-8 bg-[#1F1F1F] p-12 text-white lg:px-24 lg:py-32"
        style={soehne.style}
      >
        <Image src={LightLogo} alt="EchoSafe.org" width={180} height={180} />
        <div className="grid grid-cols-1 flex-wrap items-start justify-between gap-8 sm:grid-cols-2 lg:flex lg:flex-row">
          <div className="flex flex-col space-y-3">
            <h6 className="font-medium">Políticas</h6>
            <ul className="space-y-2 text-base font-light">
              <li>
                <Link href="/terms-of-service">Termos de Serviço</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Política de Privacidade</Link>
              </li>
            </ul>
          </div>
          <div className="align-start flex flex-col space-y-3">
            <h6 className="font-medium">Precisa de ajuda?</h6>
            <a
              href="mailto:contact@echosafe.org"
              className="text-base font-light hover:underline"
            >
              contact@echosafe.org
            </a>
          </div>
          <div className="flex h-full flex-col space-y-2">
            <h6 className="font-medium">Siga-nos</h6>

            <Button
              variant="outline"
              size="icon"
              className="border border-[#484848] text-base font-medium hover:bg-[#363636] hover:text-accent-foreground"
              asChild
            >
              <a href="https://twitter.com/echosafeorg" target="_blank">
                <Image src={TwitterSvg} alt="Twitter Icon" />
              </a>
            </Button>
          </div>
          <p className="text-center text-sm font-light sm:text-start sm:text-base">
            © 2024 EchoSafe. Todos os Direitos Reservados.
          </p>
        </div>
      </footer>
    </>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
