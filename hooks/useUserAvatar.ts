import { useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { useLocalUser } from "@/store/currentUser";

const useUserAvatar = () => {
  const { localData } = useLocalUser();
  const [avatarSrc, setAvatarSrc] = useState<string | null>(localData.photoURL);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAvatarSrc(user?.photoURL ?? localData.photoURL ?? null);
    });

    // Clean up function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [localData.photoURL]);

  return { avatarSrc, setAvatarSrc };
};

export default useUserAvatar;
