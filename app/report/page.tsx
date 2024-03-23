"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import Sidemenu from "@/components/sidemenu";
import useTokenVerifier from "@/hooks/useTokenVerifier";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import ChatBox from "./components/chat-box";
import ReportInfo from "./components/report-info";
import { chat } from "./utils";

const ReportPage: NextPage = () => {
  const id = useSearchParams().get("");
  useTokenVerifier();
  return (
    <div className="flex w-full flex-row p-2">
      <Sidemenu />
      <main className="flex w-full flex-col gap-3 p-6 lg:py-6 lg:pr-6">
        <Breadcrumbs />
        <div className="grid grid-cols-1 gap-4 2xl:grid-cols-3">
          <span className="2xl:col-span-2">
            <ChatBox id={id!} messages={chat} />
          </span>
          <ReportInfo />
        </div>
      </main>
    </div>
  );
};

export default ReportPage;
