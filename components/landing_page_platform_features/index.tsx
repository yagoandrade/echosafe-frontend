"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import Security from "@/public/assets/icons/png/security.png";
import Chat from "@/public/assets/icons/png/chat.png";
import Notification from "@/public/assets/icons/png/notification.png";
import Goal from "@/public/assets/icons/png/goal.png";
import Dashboard from "@/public/assets/icons/png/dashboard.png";
import Social from "@/public/assets/icons/png/social.png";
import Insight from "@/public/assets/icons/png/insight.png";
import Emotion from "@/public/assets/icons/png/emotion.png";

import Image from "next/image";
import localFont from "next/font/local";

const recoletaBlack = localFont({
  src: "../../public/assets/fonts/recoleta/recoleta-black.woff2",
  display: "swap",
});

const LandingPagePlatformFeatures = () => {
  return (
    <div className="flex w-full flex-col justify-center lg:flex-row lg:space-x-8">
      <Card className="w-full space-y-6 border-0 bg-transparent pt-4 shadow-none lg:w-[400px]">
        <CardHeader>
          <CardTitle style={recoletaBlack.style} className="text-3xl">
            Para alunos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 text-start">
            <div className="flex items-center justify-between space-x-5">
              <Image
                draggable={false}
                className="size-[36px]"
                src={Security}
                alt=""
              />
              <p className="text-[#808080]">
                Dê aos alunos um canal seguro para denunciar casos de bullying e
                assédio anonimamente
              </p>
            </div>
            <div className="flex items-center justify-between space-x-5">
              <Image
                draggable={false}
                className="size-[36px]"
                src={Chat}
                alt=""
              />
              <p className="text-[#808080]">
                Chat em tempo real e visibilidade total do progresso de
                denúncias
              </p>
            </div>
            <div className="flex items-center justify-between space-x-5">
              <Image
                draggable={false}
                className="size-[36px]"
                src={Goal}
                alt=""
              />
              <p className="text-[#808080]">
                Mantenha-se informado sobre o progresso da sua denúncia com
                notificações em tempo real
              </p>
            </div>
            <div className="flex items-center justify-between space-x-5">
              <Image
                draggable={false}
                className="size-[36px]"
                src={Dashboard}
                alt=""
              />
              <p className="text-[#808080]">
                Uma interface interativa que te ajuda a identificar recursos e a
                resolver seu problema
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator orientation="vertical" className="hidden lg:flex" />

      <Card className="w-full space-y-6 border-0 bg-transparent pt-4 shadow-none lg:w-[400px]">
        <CardHeader>
          <CardTitle style={recoletaBlack.style} className="text-3xl">
            Para sua equipe escolar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 text-start">
            <div className="flex items-center justify-between space-x-5">
              <Image
                draggable={false}
                className="size-[36px]"
                src={Social}
                alt=""
              />
              <p className="text-[#808080]">
                Obtenha respostas e suporte abrangentes para questões
                relacionadas às necessidades dos estudantes.
              </p>
            </div>
            <div className="flex items-center justify-between space-x-5">
              <Image
                draggable={false}
                className="size-[36px]"
                src={Insight}
                alt=""
              />
              <p className="text-[#808080]">
                Estatísticas, tendências e relatórios detalhados sobre casos de
                bullying
              </p>
            </div>
            <div className="flex items-center justify-between space-x-5">
              <Image
                draggable={false}
                className="size-[36px]"
                src={Notification}
                alt=""
              />
              <p className="text-[#808080]">
                Receba alertas estratégicos sobre incidentes significativos
              </p>
            </div>
            <div className="flex items-center justify-between space-x-5">
              <Image
                draggable={false}
                className="size-[36px]"
                src={Emotion}
                alt=""
              />
              <p className="text-[#808080]">
                Forneça insights para suporte especializado e intervenções
                personalizadas para os profissionais de saúde mental.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPagePlatformFeatures;
