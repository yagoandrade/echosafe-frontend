import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import UnknownPerson from "@/public/assets/icons/png/unknown_person.png";
import SMS from "@/public/assets/icons/png/sms.png";
import Report from "@/public/assets/icons/png/report.png";
import Robot from "@/public/assets/icons/png/robot.png";

export function LandingPageAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="inline-flex items-center gap-x-2 text-start">
            <Image draggable={false} src={UnknownPerson} alt="" />{" "}
            <p>Denúncias completamente anônimas</p>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Damos acompanhamento detalhado a cada denúncia, preservando por
          completo a identidade do denunciante. Seus dados estão seguros e as
          autoridades escolares serão notificadas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <span className="inline-flex items-center gap-x-2 text-start">
            <Image draggable={false} src={Report} alt="" />{" "}
            <p>Emita relatórios detalhados para seu colégio</p>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Sua equipe opera melhor quando fundamenta decisões em cima de dados.
          Nossa plataforma de relatórios ajuda você a identificar tendências,
          analisar necessidades e personalizar intervenções para apoiar
          efetivamente seus alunos.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <span className="inline-flex items-center gap-x-2 text-start">
            <Image draggable={false} src={Robot} alt="" />{" "}
            <p>Integração com inteligência artificial</p>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Utilizando inteligência artificial de ponta, nossa plataforma auxilia
          na resolução eficiente de problemas, fornecendo suporte personalizado
          para enfrentar os desafios específicos dos alunos e a entendê-los
          melhor.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
