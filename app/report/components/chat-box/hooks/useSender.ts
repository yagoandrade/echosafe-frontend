import { db } from "@/config/firebase";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { useCurrentUserStore } from "@/store/currentUser";
import { onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { IMessage } from "../types";

const useSender = () => {
  const {
    userData: { linkedSchool },
  } = useCurrentUserStore();
  const {
    currentSchool: { code },
  } = useCurrentSchoolStore();

  const [dbMessages, setDbMessages] = useState<IMessage[]>([]);
  const [schoolNameFromUid, setSchoolNameFromUid] = useState("");

  const addMessage = (chatId: string, message: IMessage) => {
    const messagesRef = ref(db, `schools/${code}/messages/${chatId}`);
    push(messagesRef, { ...message, time: new Date().toISOString() });
  };

  const listenForNewMessages = (chatId: string) => {
    const messagesRef = ref(db, `schools/${code}/messages/${chatId}`);

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
    if (!code) {
      return;
    }
    onValue(ref(db, `schools/${code}`), (snapshot) => {
      setSchoolNameFromUid(snapshot.val().schoolName);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, linkedSchool]);
  return { addMessage, listenForNewMessages, dbMessages, schoolNameFromUid };
};

export default useSender;
