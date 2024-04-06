import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../ui/card";
import InviteTeamMembers from "@/../public/assets/images/team_people.png";

const InviteTeamMembersCard = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex w-full flex-row justify-between p-0 xl:pr-3 xl:pt-2">
        <Image
          src={InviteTeamMembers}
          alt="Team members"
          draggable={false}
          className="-ml-5 -mt-5 w-full xl:-ml-6 xl:-mt-9"
        />
      </CardHeader>
      <CardContent className="-mt-8 space-y-2 p-6 pt-0">
        <h6 className="text-lg font-semibold">Bring your team aboard</h6>
        <p className="text-sm font-light text-[#A1A1AA]">
          Promote a safer environment in your institution today.
        </p>
      </CardContent>
    </Card>
  );
};

export default InviteTeamMembersCard;
