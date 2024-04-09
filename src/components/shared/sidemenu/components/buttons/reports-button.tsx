"use client";
import { Button } from "@/components/ui/button";
import { useActiveInstitution } from "@/hooks/useActiveInstitution";
import { api } from "@/trpc/react";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";

const SidemenuReportsButton = () => {
  const [activeInstitutionId] = useActiveInstitution();

  const numberOfReports = api.post.getNumberOfReports.useQuery({
    institutionId: activeInstitutionId ?? "",
  });

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/reports">
        <MessagesSquare className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>Reports</p>
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#575bc7] text-xs text-white">
          <p>{numberOfReports.data! > 99 ? "+99" : numberOfReports?.data}</p>
        </span>
      </Link>
    </Button>
  );
};

export default SidemenuReportsButton;
