"use client";

import { handleSignOut } from "@/lib/client";
import { useCurrentUserStore } from "@/store/currentUser";
import {
  BarChart3,
  Folder,
  LogOut,
  MousePointerClick,
  PanelsTopLeft,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../button";
import { GeneratePeriodicReport } from "../generate_periodic_report";
import MenuItem from "./components/menu-item";
import MenuSection from "./components/menu-section";
import { sideMenuDefaultClassName } from "./utils";
import InviteTeamMembersCard from "../invite_team_members";
import localFont from "next/font/local";

const soehne = localFont({
  src: "../../public/assets/fonts/soehne/soehne-var.woff2",
  display: "swap",
});

const Sidemenu = () => {
  let quantity = 10;

  const {
    userData: { role },
  } = useCurrentUserStore();

  return (
    <aside className={sideMenuDefaultClassName}>
      {role === "student" && (
        <MenuItem
          buttonVariant={"primary"}
          href="/reports/create"
          icon={<Plus />}
        >
          Criar nova denúncia
        </MenuItem>
      )}
      <MenuItem href="/dashboard" icon={<PanelsTopLeft />}>
        Tela Inicial (Dashboard)
      </MenuItem>
      <MenuSection title="Denúncias">
        {role === "school" ? (
          <MenuItem
            href="/reports"
            icon={<MousePointerClick />}
            badgeContent="NOVO"
          >
            Acompanhar Chamados
          </MenuItem>
        ) : (
          <MenuItem href="/reports" icon={<Folder />}>
            Listar Denúncias
          </MenuItem>
        )}
      </MenuSection>
      {/* TODO: Readicionar MenuSection para alunos quando tivermos o módulo de notificações pronto
      <MenuSection title="Gestão"> */}
      {/* TODO: Readicionar quando tivermos o módulo de notificações pronto
         <MenuItem
          href="/notificacoes"
          icon={<Bell />}
          badgeContent={quantity}
          badgeVariant="primary"
        >
          Notificações
        </MenuItem> */}
      {/* TODO: Remover esse MenuSection quando tivermos o módulo de notificações, porque ele tbm vai aparecer pra alunos */}
      {/* <MenuSection title="Gestão">
        </MenuItem> */}
      {/*  {role === "school" && (
        <GeneratePeriodicReport>
          <div className="flex w-full items-center gap-x-3">
            <Button
              variant="link"
              size="lg"
              className="w-full justify-start gap-x-4 outline-0 p-0"
            >
              <BarChart3 />
              Emitir Relatório
            </Button>
          </div>
        </GeneratePeriodicReport>
      )} */}
      {/* </MenuSection> */}
      <MenuSection title="">
        <MenuItem href="/settings" icon={<Settings />}>
          Configurações
        </MenuItem>
        <div className="flex w-full items-center gap-x-3">
          <Button
            variant="link"
            size="lg"
            className="w-full justify-start gap-x-4 p-0 outline-0"
            onClick={handleSignOut}
          >
            <LogOut />
            Sair
          </Button>
        </div>
      </MenuSection>
      <MenuSection title="">
        <div className="flex w-full justify-center gap-x-2">
          <Button
            variant="link"
            className="uppercase text-[#A1A1AA] decoration-[#A1A1AA] decoration-dotted"
            asChild
          >
            <Link href="https://status.echosafe.org/" target="_blank">
              Status
            </Link>
          </Button>
          {/* <Button
            variant="link"
            className="uppercase text-[#A1A1AA] decoration-dotted decoration-[#A1A1AA]"
            asChild
          >
            <Link href="/support">Suporte</Link>
          </Button> */}
        </div>
      </MenuSection>
      <InviteTeamMembersCard />
      <footer
        className="text-center text-xs font-light text-[#A1A1AA]"
        style={soehne.style}
      >
        © 2024 EchoSafe. Todos os Direitos Reservados.
      </footer>
    </aside>
  );
};

export default Sidemenu;
