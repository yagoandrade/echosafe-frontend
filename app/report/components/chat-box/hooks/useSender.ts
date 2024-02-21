import { db } from "@/config/firebase";
import { useCurrentUserStore } from "@/store/currentUser";
import { onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { IMessage } from "../types";

const useSender = () => {
  const {
    userData: { code, linkedSchool },
  } = useCurrentUserStore();

  const { userData } = useCurrentUserStore();

  const [dbMessages, setDbMessages] = useState<IMessage[]>([]);
  const [schoolNameFromUid, setSchoolNameFromUid] = useState("");

  const addMessage = (chatId: string, message: IMessage) => {
    const messagesRef = ref(
      db,
      `schools/${code ?? linkedSchool}/messages/${chatId}`
    );
    push(messagesRef, { ...message, time: new Date().toISOString() });
  };

  const listenForNewMessages = (chatId: string) => {
    const messagesRef = ref(
      db,
      `schools/${code ?? linkedSchool}/messages/${chatId}`
    );

    onValue(messagesRef, (snapshot) => {
      const messages: IMessage[] = [];

      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        messages.push(message);
      });
      setDbMessages(messages);

      const elem = document.getElementById("input");

      setTimeout(() => {
        elem?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    });
  };

  useEffect(() => {
    if (!code || !linkedSchool) {
      return;
    }
    onValue(ref(db, `schools/${code ?? linkedSchool}`), (snapshot) => {
      setSchoolNameFromUid(snapshot.val().schoolName);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, linkedSchool]);
  return { addMessage, listenForNewMessages, dbMessages, schoolNameFromUid };
};

export default useSender;
