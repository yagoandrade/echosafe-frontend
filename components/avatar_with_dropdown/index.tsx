"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "../avatar";
import {
  CreditCard,
  Settings,
  Users,
  UserPlus,
  Mail,
  Link as LinkIcon,
  LifeBuoy,
  Cloud,
  LogOut,
  MessageCircleWarning,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { GeneratePeriodicReport } from "../generate_periodic_report";
import { Button } from "../button";
import { handleGetReferralLink, handleSignOut } from "@/lib/client";
import { EmailInviteModal } from "../email_invite_modal";
import useUserAvatar from "@/hooks/useUserAvatar";
import { useCurrentUserStore } from "@/store/currentUser";
import { auth } from "@/config/firebase";

const AvatarWithDropdown = () => {
  const { avatarSrc } = useUserAvatar();
  const { userData } = useCurrentUserStore();

  const user = auth.currentUser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mt-1.5 cursor-pointer" asChild>
        <Avatar src={avatarSrc ?? ""} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {user?.displayName ?? userData.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <Link href="/statistics">
            <DropdownMenuItem className="cursor-pointer">
              <BarChart4 className="mr-2 h-4 w-4" />
              <span>Estatísticas</span>
              <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link> */}
          <Link href="/reports">
            <DropdownMenuItem className="cursor-pointer">
              <MessageCircleWarning className="mr-2 size-4" />
              <span>
                {userData.role === "school"
                  ? "Listar Denúncias"
                  : "Minhas Denúncias"}
              </span>
              {/* <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </Link>

          {/* TODO: Readicionar no marco 2
          {userData.role === "school" ? (
            <Link href="/subscription">
              <DropdownMenuItem className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Meu Plano</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ) : null}
          */}

          {/* TODO: Readicionar no marco 2
           userData.role === "school" ? (
            <GeneratePeriodicReport>
              <Button
                variant="wrapper"
                className="px-2 font-normal gap-x-0 h-fit w-full"
              >
                <Newspaper className="mr-2 h-4 w-4" />
                <span>Emitir Relatório</span>
                <DropdownMenuShortcut></DropdownMenuShortcut>
              </Button>
            </GeneratePeriodicReport>
          ) : null */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* TODO: Readicionar no marco 2
         userData.role === "school" ? (
          <>
            <DropdownMenuGroup>
              <Link href="/team">
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Minha Equipe</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSub>

                 <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Convidar Pessoas</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <EmailInviteModal>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-fit font-normal w-full flex justify-start px-2 py-1 font-normal gap-x-1 h-fit w-full"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        <span>E-mail</span>
                      </Button>
                    </EmailInviteModal>
                    <Button
                      variant="ghost"
                      onClick={handleGetReferralLink}
                      size="sm"
                      className="h-fit font-normal w-full flex justify-start px-2 py-1 font-normal gap-x-1 h-fit w-full"
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      <span>Link</span>
                    </Button>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
              ) : null */}

        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 size-4" />
            <span>Configurações</span>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </Link>
        {/* TODO: Reativar quando tivermos o módulo de Suporte */}
        {/* <Link href="/support"> */}
        <DropdownMenuItem className="cursor-pointer" disabled>
          <LifeBuoy className="mr-2 size-4" />
          <span>Suporte</span>
        </DropdownMenuItem>
        {/* </Link> */}

        {userData.role === "school" ? (
          <DropdownMenuItem disabled>
            <Cloud className="mr-2 size-4" />
            <span>API</span>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <Button
          variant="wrapper"
          size="sm"
          className="h-fit w-full gap-x-0 px-0 font-normal"
          onClick={handleSignOut}
        >
          <DropdownMenuItem className="w-full cursor-pointer">
            <LogOut className="mr-2 size-4" />
            <span>Sair</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarWithDropdown;
