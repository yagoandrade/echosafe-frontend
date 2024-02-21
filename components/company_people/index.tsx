"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardSubtitle,
  CardFooter,
} from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { Button } from "../button";
import { Data, useCurrentUserStore } from "@/store/currentUser";
import { getUserBySchoolCode } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getDefaultPhotoURL } from "@/app/authentication/components/hooks/utils";

const CompanyPeople = () => {
  const { userData } = useCurrentUserStore();
  const [schoolOwner, setSchoolOwner] = useState<Data | null>(null);

  const schoolName = userData.schoolName;

  useEffect(() => {
    const getUserBySchoolCodeHelper = async () => {
      const _ = await getUserBySchoolCode(userData.linkedSchool ?? "");
      console.log(_);

      setSchoolOwner(_);
    };

    getUserBySchoolCodeHelper();
  }, []);

  return schoolOwner ? (
    <Card className="flex h-full flex-col gap-y-5">
      <CardHeader className="gap-y-3">
        <CardTitle>Responsáveis do Colégio</CardTitle>
        <CardSubtitle>{schoolName}</CardSubtitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src={getDefaultPhotoURL(schoolOwner.linkedSchool!)} />
          </Avatar>
          <div className="flex w-full flex-col gap-y-0.5 overflow-hidden whitespace-nowrap text-sm">
            <span className="flex w-full justify-between gap-x-2">
              <p className="font-bold">{schoolOwner?.name}</p>
              {/*
                TODO: Readicionar quando tivermos os cargos bem definidos
              <p className="font-semibold truncate">{schoolOwner?.role}</p> */}
            </span>
            <span className="flex w-full justify-between gap-x-2">
              <p className="-[#71717A] font-light">{schoolOwner?.email}</p>
              {/*
                TODO: Readicionar quando tivermos os cargos bem definidos
              <p className="font-light text-[#71717A] truncate">{schoolOwner?.role}</p> */}
            </span>
          </div>
        </div>

        {/*  {users.map((user, index) => (
          <div key={user.username} className="flex gap-x-2 items-center">
            <Avatar>
              <AvatarImage src={user.avatarSrc} />
            </Avatar>
            <div className="flex flex-col gap-y-0.5 text-sm w-full overflow-hidden whitespace-nowrap">
              <span className="w-full flex justify-between gap-x-2">
                <p className="font-bold">{user.fullName}</p>
                <p className="font-semibold truncate">{user.role}</p>
              </span>
              <span className="w-full flex gap-x-2 justify-between">
                <p className="font-light -[#71717A]">{user.email}</p>
                <p className="font-light text-[#71717A] truncate">
                  {user.class}
                </p>
              </span>
            </div>
          </div>
        ))} */}
      </CardContent>
      {userData.role === "school" ? (
        <CardFooter className="mt-auto flex md:justify-end">
          <Link
            href="/team"
            className="hidden items-center gap-x-1 font-medium text-[#4F46E5] hover:underline md:flex"
          >
            Ver sua equipe
            <ChevronRight size="1rem" className="min-w-fit" />
          </Link>
          <Button
            variant="outline"
            className="pointer-events-auto col-span-2 flex w-full items-center justify-center gap-x-2 font-medium hover:underline md:hidden"
            asChild
          >
            <Link href="/team">
              <Users />
              <p className="font-medium">Ver sua equipe</p>
            </Link>
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  ) : null;
};

export default CompanyPeople;
