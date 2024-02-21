import localFont from "next/font/local";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import InviteTeamMembers from "@/public/assets/images/team_people.png";
import { ArrowUpRight } from "lucide-react";

const soehne = localFont({
  src: "../../public/assets/fonts/soehne/soehne-var.woff2",
  display: "swap",
});

const InviteTeamMembersCard = () => {
  return (
    <Card className="overflow-hidden" style={soehne.style}>
      <CardHeader className="flex w-full flex-row justify-between p-0 xl:pr-3 xl:pt-2">
        <Image
          src={InviteTeamMembers}
          alt="Team members"
          draggable={false}
          className="-ml-5 -mt-5 w-full xl:-ml-6 xl:-mt-9"
        />
        <ArrowUpRight
          size="1rem"
          color="black"
          className="hidden min-w-fit xl:flex"
        />
      </CardHeader>
      <CardContent className="-mt-8 space-y-2 p-6 pt-0">
        <h6 className="text-lg font-semibold">Traga sua equipe</h6>
        <p className="text-sm font-light text-[#A1A1AA]">
          Compartilhe o trabalho. Colha os benefícios.
        </p>
      </CardContent>
    </Card>
  );
};

export default InviteTeamMembersCard;
