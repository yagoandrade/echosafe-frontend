"use client";

import { cn } from "@/lib/utils";
import { useCollaboratorStore } from "@/store/currentUserRoles";
import {
  Folder,
  LogOut,
  Menu,
  MousePointerClick,
  PanelsTopLeft,
  Plus,
  Settings,
  X,
} from "lucide-react";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import MockupLogo from "../../public/assets/svg/mockup-logo.svg";
import { Button } from "../button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import MenuItem from "./components/menu-item";
import { Data, useCurrentUserStore } from "@/store/currentUser";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

interface MobileSidemenuProps {
  className?: string;
  children: React.ReactNode;
}

const soehne = localFont({
  src: "../../public/assets/fonts/soehne/soehne-var.woff2",
  display: "swap",
});

const MobileSidemenu = ({ className, children }: MobileSidemenuProps) => {
  const { isCollaborator } = useCollaboratorStore();

  const { setUserData } = useCurrentUserStore();
  const { push } = useRouter();

  const [_, __, removeCookie] = useCookies();

  return (
    <Drawer>
      <DrawerTrigger asChild className={cn(className)}>
        <Button className="p-3" variant="wrapper">
          <Menu color="#a1a1aa" />
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 z-40 bg-black/40" />

        <DrawerContent className="w-10/12 bg-white lg:w-2/3">
          <div className="flex size-full flex-col">
            <DrawerTitle className="flex w-full justify-between">
              <Link href="/dashboard" className="flex size-full px-3 py-4">
                <Image
                  priority
                  src={MockupLogo}
                  alt="Mock up logo"
                  width={180}
                  height={100}
                />
              </Link>
              <DrawerClose className="p-3">
                <X size="1.8rem" />
              </DrawerClose>
            </DrawerTitle>
            <div className="flex h-full flex-col overflow-y-scroll">
              <MenuItem
                mobileClasses="border-t"
                buttonVariant="wrapper"
                href="/dashboard"
                icon={<PanelsTopLeft size="1.2rem" />}
              >
                Tela Inicial (Dashboard)
              </MenuItem>

              {isCollaborator ? (
                <MenuItem
                  mobileClasses="border-t"
                  buttonVariant="wrapper"
                  href="/reports"
                  icon={<MousePointerClick size="1.2rem" />}
                  badgeContent="NOVO"
                >
                  Acompanhar Chamados
                </MenuItem>
              ) : (
                <MenuItem
                  mobileClasses="border-t"
                  buttonVariant="wrapper"
                  href="/reports"
                  icon={<Folder size="1.2rem" />}
                >
                  Listar Denúncias
                </MenuItem>
              )}
              {/*
              TODO: Readicionar quando tivermos o módulo de notificações pronto
              <MenuItem
                isMobile
                mobileClasses="border-t"
                buttonVariant="wrapper"
                href="/notificacoes"
                icon={<Bell size="1.2rem" />}
                badgeContent={quantity}
                badgeVariant="primary"
              >
                Notificações
              </MenuItem> */}
              {/* {isCollaborator && (
                <DrawerClose>
                  <GeneratePeriodicReport>
                    <div className="flex w-full items-center gap-x-3">
                      <Button
                        variant="wrapper"
                        size="fullWidth"
                        className="justify-start gap-x-4 px-4 rounded-none py-8 active:scale-[1] active:text-[#4F46E5] border-b"
                      >
                        <BarChart3 />
                        Emitir Relatório
                      </Button>
                    </div>
                  </GeneratePeriodicReport>
                </DrawerClose>
              )} */}

              <MenuItem
                mobileClasses="border-t"
                buttonVariant="wrapper"
                href="/settings"
                icon={<Settings size="1.2rem" />}
              >
                Configurações
              </MenuItem>
              <div className="flex w-full items-center gap-x-3 border-t">
                <Button
                  variant="wrapper"
                  size="fullWidth"
                  onClick={() => {
                    removeCookie("access_token");
                    removeCookie("refresh_token");
                    setUserData({} as Data);
                    push("/");
                  }}
                  className="justify-start gap-x-4 rounded-none border-b px-4 py-8 active:scale-[1] active:text-[#4F46E5]"
                >
                  <LogOut />
                  Sair
                </Button>
              </div>

              {/* <div className="mt-4 mx-auto space-3">
                <Button
                  variant="link"
                  size="lg"
                  className="uppercase text-[#A1A1AA] decoration-dotted decoration-[#A1A1AA]"
                  asChild
                >
                  <Link href="https://status.echosafe.org/" target="_blank">
                    Status
                  </Link>
                </Button>
              </div> */}
            </div>

            <DrawerFooter className="mb-0 p-0">
              <div className="px-3">
                <MenuItem
                  buttonVariant="primary"
                  href="/reports/create"
                  icon={<Plus size="1.2rem" />}
                >
                  Criar nova denúncia
                </MenuItem>
              </div>
              {children}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default MobileSidemenu;
