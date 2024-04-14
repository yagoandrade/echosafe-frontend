"use client";
import { Smile, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardDescription, CardContent, CardHeader } from "../ui/card";
import { api } from "@/trpc/react";

export function DashboardHeader() {
  const userRoleQuery = api.post.getUserRole.useQuery();
  const activeInstitutionFromDB = api.post.getActiveInstitution.useQuery();

  const handleCopyInstitutionCode = async () => {
    if (!activeInstitutionFromDB.data) {
      toast.error("No active institution");
      return;
    }

    await navigator.clipboard.writeText(activeInstitutionFromDB.data.code);
    toast.success(
      `The code of ${activeInstitutionFromDB.data.name} has been copied to clipboard`,
    );
  };

  return userRoleQuery.data !== "STUDENT" ? (
    <div className="grid grid-cols-4 gap-4 xl:gap-6">
      <Card className="col-span-4 md:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardDescription>REPORTS RECEIVED TODAY</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex w-full items-end justify-between">
            <h1 className="text-5xl font-bold">10</h1>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardDescription>DENÚNCIAS NO MÊS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex w-full items-end justify-between">
            <h1 className="text-5xl font-bold">50</h1>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardDescription>SOLVED REPORTS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex w-full items-end justify-between">
            <h1 className="text-5xl font-bold">1</h1>
            <span className="flex gap-x-1 font-medium text-[#EF4444]">
              <Smile />
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-2 xl:col-span-1">
        <CardHeader className="flex-row justify-between">
          <CardDescription>
            {`${activeInstitutionFromDB.data?.name}'s Code`}
          </CardDescription>
          <Button
            variant="link"
            className="size-fit p-0"
            onClick={handleCopyInstitutionCode}
          >
            <Copy size="1rem" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex w-full items-end justify-between">
            <h1 className="text-4xl font-bold">
              {activeInstitutionFromDB?.data?.code}
            </h1>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : null;
}
