"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { type Message } from "@/lib/supabase/types";
import { useActiveInstitutionStore } from "@/providers/activeInstitutionStoreProvider";
import { MessagesSquare, Send } from "lucide-react";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ChatBoxProps {
  channelId: number;
  currentUser?: Session["user"];
  userRole: string;
}

const ChatBox = ({ channelId, currentUser, userRole }: ChatBoxProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("channel_id", channelId);
      if (error) {
        console.error("Error fetching messages:", error.message);
      } else {
        setMessages(data);
      }
    };

    void fetchMessages();

    const subscription = supabase
      .channel(`messages-${channelId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        (payload) =>
          setMessages((prevMessages) => [
            ...prevMessages,
            payload.new as Message,
          ]),
      )
      .subscribe();

    return () => {
      void subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /* Check if user changes his activeInstitution */
  const router = useRouter();
  const { activeInstitution } = useActiveInstitutionStore((state) => state);

  const [loadedActiveInstitutionId, setLoadedActiveInstitutionId] = useState<
    null | number
  >(null);

  useEffect(() => {
    if (!loadedActiveInstitutionId && activeInstitution?.id) {
      setLoadedActiveInstitutionId(activeInstitution.id);
    } else if (
      loadedActiveInstitutionId &&
      activeInstitution?.id !== loadedActiveInstitutionId
    ) {
      router.push("/dashboard");
    }
  }, [activeInstitution]);

  const handleSendMessage = async () => {
    if (input.length === 0) {
      toast.error("Message cannot be empty");
      return;
    }

    await supabase.from("messages").insert({
      message: input,
      user_role: userRole,
      channel_id: channelId,
      user_email: currentUser?.email,
    });
    setInput("");
  };

  return (
    <div className="flex size-full min-h-[500px] flex-col rounded-lg border">
      <div className="size-full overflow-y-scroll p-8">
        {messages.map((message) => {
          return currentUser?.email === message.user_email ? (
            <div className="flex justify-end gap-2.5" key={message.id}>
              <div className="">
                <div className="mb-2 grid">
                  <h5 className="pb-1 text-right text-sm font-semibold leading-snug text-gray-900">
                    You
                  </h5>
                  <div className="ml-auto flex max-w-[500px] flex-wrap text-wrap rounded bg-indigo-600 px-3 py-2">
                    <h2 className="w-full break-words text-sm font-normal leading-snug text-white">
                      {message.message}
                    </h2>
                  </div>
                  <div className="inline-flex items-center justify-start">
                    <h3 className="py-1 text-xs font-normal leading-4 text-gray-500">
                      {new Date(message.inserted_at).toLocaleDateString() +
                        " " +
                        new Date(message.inserted_at).toLocaleTimeString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 flex gap-2.5" key={message.id}>
              <div className="grid">
                <h5 className="pb-1 text-sm font-semibold leading-snug text-gray-900">
                  {message.user_role === "STUDENT"
                    ? "Student"
                    : message.user_email}
                </h5>
                <div className="grid w-max">
                  <div className="inline-flex max-w-[500px] flex-wrap items-center justify-start gap-3 text-wrap rounded bg-gray-100 px-3.5 py-2">
                    <h5 className="break-words text-sm font-normal leading-snug text-gray-900">
                      {message.message}
                    </h5>
                  </div>
                  <div className="mb-2.5 inline-flex items-center justify-end">
                    <h6 className="py-1 text-xs font-normal leading-4 text-gray-500">
                      {new Date(message.inserted_at).toLocaleDateString() +
                        " " +
                        new Date(message.inserted_at).toLocaleTimeString()}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <div className="flex size-full flex-col items-center justify-center gap-y-4">
            <MessagesSquare
              className="text-gray-500"
              strokeWidth={1}
              size="6rem"
            />
            <h3 className="text-center text-sm font-light leading-6 text-gray-500 lg:text-lg">
              Start the conversation by sending a message.
            </h3>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="inline-flex w-full flex-wrap items-center justify-between gap-2 border-t border-gray-200 px-1 py-1 lg:flex-nowrap xl:px-8">
        <div className="flex w-full items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={currentUser?.image ?? ""}
              alt={currentUser?.name ?? "Your avatar"}
              className="object-cover"
            />
          </Avatar>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleSendMessage();
            }}
            placeholder="Type here..."
          />
        </div>
        <div className="flex w-full items-center gap-2 lg:w-fit">
          <Button
            variant="primary"
            className="w-full lg:w-fit"
            onClick={handleSendMessage}
          >
            <h3 className="px-2 text-xs font-semibold leading-4 text-white">
              Send
            </h3>
            <Send size="1rem" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
