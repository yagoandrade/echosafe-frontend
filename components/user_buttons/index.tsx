import React from "react";
import AvatarWithDropdown from "../avatar_with_dropdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../button";
import { LayoutDashboard, School } from "lucide-react";

interface UserButtonsProps {
  className?: string;
}

const UserButtons = ({ className = "" }: UserButtonsProps) => {
  return (
    <div className={cn("flex gap-x-3", className)}>
      {/*
        TODO: Adicionar de volta quando fizermos o módulo de Inbox e Notificações
      <Inbox />
      <Notifications /> */}
      <Button variant="outline" asChild>
        <Link href="/dashboard" className="size-fit gap-x-1.5">
          <LayoutDashboard size="1rem" strokeWidth="0.1rem" />
          Dashboard
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/teams" className="size-fit gap-x-1.5">
          <School size="1rem" strokeWidth="0.1rem" />
          Meus Ambientes
        </Link>
      </Button>
      <AvatarWithDropdown />
    </div>
  );
};

export default UserButtons;
