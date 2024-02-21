import Image from "next/image";
import { Card, CardHeader, CardContent } from "../ui/card";
import localFont from "next/font/local";
import Hug from "@/public/assets/icons/png/hug.png";
import Happy from "@/public/assets/icons/png/happy.png";
import Report from "@/public/assets/icons/png/report_analysis.png";
import Robot from "@/public/assets/icons/png/assistent.png";
import { Separator } from "../ui/separator";

const recoletaBlack = localFont({
  src: "../../public/assets/fonts/recoleta/recoleta-black.woff2",
  display: "swap",
});

const LandingPageSecondaryFeatures = () => {
  return (
    <div className="flex flex-col justify-around lg:flex-row">
      <Card className="w-full space-y-6 border-0 bg-transparent pt-4 shadow-none lg:w-[400px]">
        <CardHeader className="w-full items-center">
          <Image
            draggable={false}
            className="size-[80px]"
            src={Hug}
            alt=""
          />
        </CardHeader>
        <CardContent className="space-y-3 text-center">
          <h6 className="text-lg font-semibold">
            Forneça apoio emocional aos seus alunos a qualquer momento
          </h6>
          <p className="font-light text-[#808080]">
            A EchoSafe® está disponível 24 horas por dia, sete dias por semana,
            inclusive nos feriados. Porque cuidar do bem-estar emocional não tem
            horário restrito.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full space-y-6 border-0 bg-transparent pt-4 shadow-none lg:w-[400px]">
        <CardHeader className="w-full items-center">
          <Image
            draggable={false}
            className="size-[80px]"
            src={Happy}
            alt=""
          />
        </CardHeader>
        <CardContent className="space-y-3 text-center">
          <h6 className="text-lg font-semibold">
            Estabeleça um ponto de denúncias único e intuitivo para os alunos
          </h6>
          <p className="font-light text-[#808080]">
            Não é mais necessário ter seus alunos pleiteando casos com vários
            responsáveis no campus. Reuna suas equipes sob um único teto
            digital, para oferecer um sistema de suporte centrado no aluno.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full space-y-6 border-0 bg-transparent pt-4 shadow-none lg:w-[400px]">
        <CardHeader className="w-full items-center">
          <Image
            draggable={false}
            className="size-[80px]"
            src={Report}
            alt=""
          />
        </CardHeader>
        <CardContent className="space-y-3 text-center">
          <h6 className="text-lg font-semibold">
            Acompanhe os dados e seu impacto em Tempo Real
          </h6>
          <p className="font-light text-[#808080]">
            Sua equipe opera melhor quando fundamenta decisões em cima de dados.
            Nossa plataforma de relatórios ajuda você a identificar tendências,
            analisar necessidades e personalizar intervenções para apoiar
            efetivamente seus alunos.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full space-y-6 border-0 bg-transparent pt-4 shadow-none lg:w-[400px]">
        <CardHeader className="w-full items-center">
          <Image
            draggable={false}
            className="size-[80px]"
            src={Robot}
            alt=""
          />
        </CardHeader>
        <CardContent className="space-y-3 text-center">
          <h6 className="text-lg font-semibold">
            Resolva problemas com a ajuda do seu próprio assistente de IA
          </h6>
          <p className="font-light text-[#808080]">
            Utilizando inteligência artificial de ponta, nossa plataforma
            auxilia na resolução eficiente de problemas, fornecendo suporte
            personalizado para enfrentar os desafios específicos dos alunos e a
            entendê-los melhor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPageSecondaryFeatures;
