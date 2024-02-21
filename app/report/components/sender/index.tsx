"use client";
import { Send, SendHorizonal } from "lucide-react";
import { useRef, useState } from "react";
import { ISender } from "./types";
import { Button } from "@/components/button";

const Sender: React.FC<ISender> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (message: string) => {
    if (!message) {
      return;
    }
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="mt-4 flex w-full flex-row items-center gap-4 border-t border-gray-300 bg-white px-2">
      <input
        className="w-full p-4 text-sm text-[#71717A] outline-0"
        placeholder="Digitar resposta"
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
        id="input"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSendMessage(message);
        }}
      />
      <Button
        className="cursor-pointer p-2"
        variant="ghost"
        onClick={() => handleSendMessage(message)}
      >
        <SendHorizonal color="#8E8E93" size="1.25rem" strokeWidth={1.75} />
      </Button>
    </div>
  );
};

export default Sender;
