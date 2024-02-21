import React from "react";
import Notifications from "../notifications";
import Inbox from "../inbox";
import AvatarWithDropdown from "../avatar_with_dropdown";
import { cn } from "@/lib/utils";

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
      <AvatarWithDropdown />
    </div>
  );
};

export default UserButtons;
