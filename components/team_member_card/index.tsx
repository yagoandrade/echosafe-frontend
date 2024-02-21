import { Briefcase, PartyPopper } from "lucide-react";
import Avatar from "../avatar";
import { Button } from "../button";
import { Meteors } from "../ui/meteors";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface TeamMemberCardProps {
  name: string;
  avatarImgSrc: string;
  role: string;
  institution: string;
  solvedReports: number;
  totalReports: number;
  showSettingsButton: boolean;
}

export function TeamMemberCard({
  name,
  avatarImgSrc,
  role,
  institution,
  solvedReports,
  totalReports,
  showSettingsButton,
}: Readonly<TeamMemberCardProps>) {
  return (
    <div className="relative size-full text-white">
      <div className="absolute inset-0 size-full scale-[0.80] rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
      <div className="relative flex h-full flex-col items-start  justify-start space-y-4 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
        <div className="z-10 flex w-full justify-center">
          <Avatar src={avatarImgSrc} className="size-52" />
        </div>

        <div className="w-full space-y-2">
          <h1 className="relative z-10 text-xl font-bold">{name}</h1>
          <div className="space-y-1">

          <Badge
            variant="primary"
            className="flex w-full items-center gap-x-1 font-semibold text-zinc-200"
          >
            <Briefcase size="1rem" />
            {role}
          </Badge>
          <Badge
            variant="outline"
            className="flex w-full items-center justify-center gap-x-1 font-semibold text-zinc-200"
          >
            {institution}
          </Badge>
          </div>
        </div>

        <h3 className="text-sm font-bold">Denúncias Resolvidas</h3>
        <div className="flex w-full items-center justify-between gap-x-1">
          <h4 className="text-6xl font-bold">
            {solvedReports}/{totalReports}
          </h4>
          {solvedReports === totalReports ? (
            <p className="text-4xl">🎉</p>
          ) : null}
        </div>
        <Progress value={(solvedReports / totalReports) * 100} />

        {showSettingsButton ? (
          <Button variant="primary" size="fullWidth" asChild>
            <Link href="/settings">Editar seu perfil</Link>
          </Button>
        ) : null}

        <Meteors number={20} />
      </div>
    </div>
  );
}
