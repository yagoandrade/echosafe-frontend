import {
  getColorFromCode,
  getIconFromCode,
  getStatusFromCode,
} from "@/components/report_card/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentReportStore } from "@/store/currentReport";

const ReportInfo = () => {
  const { currentComplaint } = useCurrentReportStore();

  const categories = JSON.parse(currentComplaint?.category || "[]").join(", ");

  return currentComplaint ? (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Chamado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Status</span>
            <span className="text-sm">
              <Badge
                variant={currentComplaint?.status}
                className={`h-fit w-full items-center justify-center gap-x-2 self-center text-base xs:w-fit xs:justify-start sm:text-sm`}
              >
                <span
                  className="flex size-4 items-center justify-center rounded-full text-xs font-black"
                  style={{
                    backgroundColor: getColorFromCode(currentComplaint?.status),
                  }}
                >
                  {getIconFromCode(currentComplaint?.status)}
                </span>
                <p>{getStatusFromCode(currentComplaint?.status)}</p>
              </Badge>
            </span>
          </div>
          {/* TODO: Adicionar essa seção quando a autoridade responsável for definida pra cada report
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">
              Autoridade Responsável
            </span>
            <span className="text-sm">??????</span>
          </div> */}
          {/* TODO: Adicionar essa seção para o Marco 2
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Anexos</span>
            <span className="text-sm"></span>
          </div> */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Denúncia feita em</span>
            <span className="text-sm text-[#71717A]">
              {new Date(currentComplaint?.receivedDate).toLocaleDateString()}
            </span>
          </div>
          {/* TODO: Adicionar essa seção para o Marco 2
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Denúncia resolvida em</span>
            <span className="text-sm">Resolvido</span>
          </div> */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Categoria(s)</span>
            <span className="text-sm text-[#71717A]">{categories}</span>
          </div>
        </div>

        <div>
          <h3 className="font-bold leading-none tracking-tight">
            Descrição da denúncia
          </h3>
          <span className="text-sm text-[#71717A]">
            {currentComplaint?.details}
          </span>
        </div>

        {/* TODO: Reinserir na aplicação quando tivermos o módulo de IA pronto
        <div>
          <span className="flex items-center gap-x-1.5">
            <Bot size="1.25rem" />
            <h3 className="font-bold leading-none tracking-tight">
              Relatório da inteligência artificial
            </h3>
          </span>
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold">
                O que o aluno sentiu com a ofensa
              </span>
              <span className="text-sm text-[#71717A]">
                O aluno provavelmente se sentiu constrangido, humilhado e
                chateado com a situação. A atitude de ter um suco jogado nele e
                ser chamado de bestao é claramente ofensiva e pode causar
                impactos emocionais negativos.
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold">
                Em qual categoria de bullying entra a ofensa
              </span>
              <span className="text-sm text-[#71717A]">
                O relato descreve um caso de bullying verbal e também envolve
                uma forma de bullying físico leve, já que o suco foi jogado no
                aluno. As ofensas verbais e a ação física caracterizam uma
                situação de bullying misto.
              </span>
            </div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  ) : null;
};

export default ReportInfo;
