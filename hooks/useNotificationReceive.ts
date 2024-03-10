import { onChildChanged, ref, type DataSnapshot } from "firebase/database";
import { useEffect } from "react";

import type { IMessage } from "@/app/report/components/chat-box/types";
import { db } from "@/config/firebase";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { create } from "zustand";

type MessageReceive = IMessage & { messageId: string };

interface ILatestMessage {
  latestMessage: MessageReceive;
  setLatestMessage: (latestMessage: MessageReceive) => void;
}

export const useLatestMessageStore = create<ILatestMessage>((set) => ({
  latestMessage: {} as MessageReceive,
  setLatestMessage: (latestMessage) => set({ latestMessage }),
}));

const useChatNotifications = () => {
  const { currentSchool } = useCurrentSchoolStore();
  const chatRef = ref(db, `schools/${currentSchool.code}/messages`);
  const { setLatestMessage } = useLatestMessageStore();

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

      const messageDataKeys = Object.keys(messageData);
      const messageDataKeysLength = messageDataKeys.length;

      const lastMessageKey = messageDataKeys[messageDataKeysLength - 1];
      const messageObject = messageData[lastMessageKey];

      console.log(messageObject, "mess object");
      setLatestMessage({ ...messageObject, messageId });
      saveNotificationOnLocalStorage(messageObject);
    };

    onChildChanged(chatRef, handleChildChanged);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useChatNotifications;
