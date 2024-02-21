import React from "react";
import type { IMessageStyle } from "./types";

const Message: React.FC<IMessageStyle> = ({
  variant,
  role,
  sender,
  children,
}) => {
  return (
    <div
      className={`p-2 ${
        variant === "receiver"
          ? "bg-[#F2F2F7]"
          : "self-end bg-[#007AFF] text-white"
      } mr-6 w-fit max-w-[11/12] rounded-md`}
    >
      {role && (
        <div className="flex flex-row gap-1">
          <article className="mb-1 text-stone-400">{sender}</article>
          <article className="text-gray-600">{role}</article>
        </div>
      )}
      <article>{children}</article>
    </div>
  );
};

export default Message;
