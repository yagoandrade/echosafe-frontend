"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Sidemenu from "@/components/sidemenu";
import { TeamMemberCard } from "@/components/team_member_card";
import { auth } from "@/config/firebase";
import useUserAvatar from "@/hooks/useUserAvatar";

const Team = () => {
  const institution = "Instituto de Computação";
  const { avatarSrc } = useUserAvatar();

  const user = auth.currentUser;

  const users = [
    {
      name: user?.displayName ?? "Você",
      avatarImgSrc: avatarSrc ?? "",
      role: "Coordenador(a)",
      institution: "Instituto de Computação",
      solvedReports: 41,
      totalReports: 43,
      showSettingsButton: true,
    },
  ];

  return (
    <div className="flex w-full justify-start">
      <Sidemenu />
      <div className="flex w-full flex-col gap-3 p-6 lg:py-6 lg:pr-6">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold">Equipe do {institution}</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <TeamMemberCard {...users[0]} />
        </div>
      </div>
    </div>
  );
};

export default Team;
