import { onChildChanged, ref, type DataSnapshot } from "firebase/database";
import { useEffect, useState } from "react";

import type { IMessage } from "@/app/report/components/chat-box/types";
import { db } from "@/config/firebase";

type MessageReceive = IMessage & { messageId: string };

const useChatNotifications = () => {
  const chatRef = ref(db, "chats/");
  const [latestMessage, setLatestMessage] = useState<MessageReceive>(
    {} as MessageReceive
  );

  const saveNotificationOnLocalStorage = (newNotification: MessageReceive) => {
    const notifications = localStorage.getItem("@notifications");
    const notificationsArray = [
      ...JSON.parse(notifications ?? "[]"),
      newNotification,
    ];
    localStorage.setItem("@notifications", JSON.stringify(notificationsArray));
  };

  useEffect(() => {
    const handleChildChanged = (snapshot: DataSnapshot) => {
      const messageId = snapshot.key;
      const messageData = snapshot.val();

      const messageKeys = Object.keys(messageData?.messages || {});
      const lastMessageKey = messageKeys[messageKeys.length - 1];
      const messageObject = {
        ...messageData?.messages[lastMessageKey],
        messageId,
      };
      setLatestMessage(messageObject);
      saveNotificationOnLocalStorage(messageObject);
    };

    onChildChanged(chatRef, handleChildChanged);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { latestMessage };
};

export default useChatNotifications;
