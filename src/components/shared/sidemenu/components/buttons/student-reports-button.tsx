"use client";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";

const SidemenuStudentReportsButton = () => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/reports">
        <MessagesSquare className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>My Reports</p>
      </Link>
    </Button>
  );
};

export default SidemenuStudentReportsButton;
