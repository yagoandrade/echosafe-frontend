"use client";
import CompanyPeople from "@/components/company_people";
import RecentReports from "@/components/recent_reports";
import ReportTypes from "@/components/report_types";
import Sidemenu from "@/components/sidemenu";
import {
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
} from "@/components/ui/card";
import useNotificationReceive, {
  useLatestMessageStore,
} from "@/hooks/useNotificationReceive";
import useTokenVerifier from "@/hooks/useTokenVerifier";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { useCurrentUserStore } from "@/store/currentUser";
import { useCollaboratorStore } from "@/store/currentUserRoles";
import { BoxSelect, Smile } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { useReportStore } from "../hooks/reports/store";
import BullyingChart from "./components/bullying_chart";
import { Button } from "@/components/button";

const getUserRelationshipToSchool = (
  schoolName: string,
  isCollaborator: boolean
) => {
  if (!schoolName)
    return (
      <div>
        <h1 className="text-sm uppercase text-[#71717A]">
          Não vinculado a nenhuma escola
        </h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-sm uppercase text-[#71717A]">
        {isCollaborator ? "Gerenciando" : "Vinculado a(o)"}
      </h1>
      <p className="text-lg font-bold text-[#4F46E5]">{schoolName}</p>
    </div>
  );
};

const Dashboard = () => {
  const {
    latestMessage: { messageId, receiver, sender, content },
  } = useLatestMessageStore();

  const { userData } = useCurrentUserStore();
  const { complaints } = useReportStore();
  const { currentSchool } = useCurrentSchoolStore();
  const { isCollaborator } = useCollaboratorStore();

  useTokenVerifier();

  useEffect(() => {
    if (!receiver) {
      return;
    }
    if (
      (isCollaborator && receiver === currentSchool.name) ||
      receiver === userData.id
    ) {
      toast.success(
        <Link href={`/report?=${messageId}`}>
          Você recebeu uma nova mensagem!
        </Link>,
        { style: { backgroundColor: "green", color: "white" } }
      );
    }
  }, [receiver, messageId, userData.owner]);

  useNotificationReceive();

  if (!currentSchool.name) {
    return (
      <main className="size-full text-black">
        <section className="relative flex size-full flex-col items-center justify-center gap-4 p-6">
          <BoxSelect size="6rem" className="opacity-20" />
          <h3>Você não está cadastrado em nenhuma instituição.</h3>
          <Button variant="outline" asChild>
            <Link href="/teams">
              Ir para a página de cadastro de instituições
            </Link>
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="size-full text-black">
      <section className="relative flex h-full">
        <Sidemenu />
        <article className="flex size-full flex-col gap-3 p-6 lg:py-6 lg:pr-6">
          <div className="flex w-full flex-wrap justify-between gap-6 py-3">
            <span className="flex flex-wrap items-start gap-x-2">
              <h1 className="font-bold">Bem-vindo, {userData?.name}</h1>
              {isCollaborator ? (
                <p className="text-[#71717A]">
                  isso é o que ocorreu na sua escola
                </p>
              ) : null}
            </span>
            <div className="flex w-full items-center justify-between gap-4 lg:w-fit xl:gap-6">
              {getUserRelationshipToSchool(currentSchool.name, isCollaborator)}
              {/*
              TODO: Reabilitar quando tivermos as páginas de instituição
              <Link
                href="/instuicao/santissimo-senhor"
                className="h-full w-fit flex items-center justify-end"
              > */}
              {/*
              TODO: Reabilitar quando tivermos imagens de instituição <Image
                src={schoolImgSrc}
                alt={`${userData.owner}`}
                width={130}
                height={80}
              /> */}
              {/* </Link> */}
            </div>
          </div>
          {isCollaborator ? (
            <>
              {complaints.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 xl:gap-6">
                  <Card className="col-span-4 md:col-span-2 xl:col-span-1">
                    <CardHeader>
                      <CardSubtitle>DENÚNCIAS RECEBIDAS HOJE</CardSubtitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-3 flex w-full items-end justify-between">
                        <h1 className="text-5xl font-bold">
                          {
                            complaints.filter((complaint) =>
                              new Date().getDate()
                            ).length
                          }
                        </h1>
                        {/*
                    ))}</h1>
                    {/*
                    TODO: Readicionar quando tivermos mais dados
                    <span className="text-[#EF4444] font-medium flex gap-x-1">
                      +100%
                      <ArrowUp />
                    </span> */}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-4 md:col-span-2 xl:col-span-1">
                    <CardHeader>
                      <CardSubtitle>DENÚNCIAS NO MÊS</CardSubtitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-3 flex w-full items-end justify-between">
                        <h1 className="text-5xl font-bold">
                          {
                            complaints.filter((complaint) =>
                              new Date().getMonth()
                            ).length
                          }
                        </h1>
                        {/* TODO: Readicionar no marco 2
                    <span className="text-[#EF4444] font-medium flex gap-x-1">
                      -50%
                      <ArrowDown />
                    </span> */}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-4 md:col-span-2 xl:col-span-1">
                    <CardHeader>
                      <CardSubtitle>DENÚNCIAS RESOLVIDAS</CardSubtitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-3 flex w-full items-end justify-between">
                        <h1 className="text-5xl font-bold">
                          {
                            complaints.filter(
                              (complaint) => complaint.status === "resolved"
                            ).length
                          }
                        </h1>
                        <span className="flex gap-x-1 font-medium text-[#EF4444]">
                          <Smile />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-4 md:col-span-2 xl:col-span-1">
                    <CardHeader>
                      <CardSubtitle>Chamados em aberto</CardSubtitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-3 flex w-full items-end justify-between">
                        <h1 className="text-5xl font-bold">
                          {
                            complaints.filter(
                              (complaint) =>
                                complaint.status === "open" ||
                                complaint.status === "under_review" ||
                                complaint.status === "waiting"
                            ).length
                          }
                        </h1>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : null}

              <div className="grid grid-cols-12 gap-4 xl:gap-6">
                <div className="col-span-12 xl:col-span-8">
                  <BullyingChart />
                </div>
                <div className="col-span-12 xl:col-span-4">
                  <ReportTypes />
                </div>
              </div>
            </>
          ) : null}
          <div className="grid grid-cols-12 gap-4 xl:gap-6">
            <div className="col-span-12 xl:col-span-8">
              <RecentReports />
            </div>
            <div className="col-span-12 xl:col-span-4">
              <CompanyPeople />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Dashboard;
