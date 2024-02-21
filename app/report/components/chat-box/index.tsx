"use client";
import { useCurrentReportStore } from "@/store/currentReport";
import { useCurrentUserStore } from "@/store/currentUser";
import React, { useEffect, useRef } from "react";
import Message from "../message";
import Sender from "../sender";
import useSender from "./hooks/useSender";
import { IChatBox } from "./types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ChatBox: React.FC<IChatBox> = ({ id, messages }) => {
  const { userData } = useCurrentUserStore();
  const { code, linkedSchool, uid, schoolName } = userData;
  const { currentComplaint } = useCurrentReportStore();

  const { listenForNewMessages, addMessage, dbMessages, schoolNameFromUid } =
    useSender();

  const isSchool = userData.role === "school";

  useEffect(() => {
    listenForNewMessages(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, uid, schoolName]);

  const messagesEndRef: any = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [dbMessages]);

  return (
    <Card className="flex size-full flex-col bg-white pb-0">
      <CardHeader className="flex w-full flex-col items-center justify-center pb-3">
        <h3 className="font-medium">Chamado #{id}</h3>
        {/* TODO: Readicionar quando tivermos certeza que funciona corretamente
         <time
          className="font-light text-sm"
          dateTime={new Date().toISOString()}
        >
          Ultima atualização há{" "}
          {dbMessages.length
            ? new Date().getSeconds() -
              messages[messages.length - 1].time.getSeconds()
            : "..."}{" "}
          segundos
        </time> */}
      </CardHeader>
      <hr className="my-2" />
      <CardContent
        id="chat"
        className="mt-2 flex size-full max-h-[60vh] flex-col justify-center justify-between gap-2 overflow-y-auto"
      >
        {currentComplaint ? (
          <>
            <time className="my-4 self-center text-sm font-light">
              Caso ocorreu em {messages[0].time.toLocaleDateString()}
            </time>
            {dbMessages?.map(({ content, receiver, sender, time, role }, i) => (
              <React.Fragment key={i}>
                <Message
                  variant={
                    (isSchool && sender === schoolName) ||
                    (!isSchool && sender === currentComplaint?.sender)
                      ? "sender"
                      : "receiver"
                  }
                  role={role}
                  sender={sender}
                >
                  {content}
                </Message>
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex min-h-full w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-0">
        <Sender
          onSendMessage={(content) => {
            addMessage(id, {
              content,
              receiver: isSchool ? currentComplaint?.sender : schoolName!,
              sender: isSchool ? schoolName! : currentComplaint?.sender,
              time: new Date(),
            });
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
