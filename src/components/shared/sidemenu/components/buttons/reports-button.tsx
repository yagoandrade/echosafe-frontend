"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useActiveInstitutionStore } from "@/providers/activeInstitutionStoreProvider";
import { api } from "@/trpc/react";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SidemenuReportsButton = () => {
  const { activeInstitution } = useActiveInstitutionStore((state) => state);
  const [numberOfReports, setNumberOfReports] = useState<number | undefined>();

  const pathname = usePathname();

  const numberOfReportsQuery = api.post.getNumberOfReports.useQuery();

  async function fetchReports() {
    try {
      const { data } = await numberOfReportsQuery.refetch();
      if (data) setNumberOfReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Error fetching reports");
    }
  }

  useEffect(() => {
    void fetchReports();
  }, [activeInstitution]);

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className={cn(
        "flex w-full justify-start gap-x-3 px-6 text-muted-foreground dark:text-[#cbccd9]",
        pathname === "/reports" &&
          "dark:bg-primary-background border-primary-background border bg-primary-foreground font-medium text-[#1994ff] dark:border-primary-foreground dark:bg-opacity-10",
      )}
      asChild
    >
      <Link href="/reports">
        <MessagesSquare className="h-4 w-4" />
        <p>Reports</p>
        {numberOfReports && numberOfReports > 0 && (
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#1994ff] text-xs text-white">
            <p>{numberOfReports > 99 ? "+99" : numberOfReports}</p>
          </span>
        )}
      </Link>
    </Button>
  );
};

export default SidemenuReportsButton;
