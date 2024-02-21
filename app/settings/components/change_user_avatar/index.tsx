"use client";

import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import UploadImageToS3 from "@/components/upload_image_to_s3";
import { auth } from "@/config/firebase";
import useUserAvatar from "@/hooks/useUserAvatar";
import { useCurrentUserStore, useLocalUser } from "@/store/currentUser";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { FileEdit } from "lucide-react";
import { useState } from "react";

const ChangeUserAvatar = () => {
  const { avatarSrc } = useUserAvatar();
  const { localData, setLocalData } = useLocalUser();

  const [isEditing, setIsEditing] = useState(false);

  const user = auth.currentUser;

  const onUploadSuccess = async (filename: string) => {
    const newPhotoURL = `https://echosafe-images-bucket.s3.sa-east-1.amazonaws.com/${filename}`;

    if (user) {
      await updateProfile(user, { photoURL: newPhotoURL });
      await updateCurrentUser(auth, user);
    }

    setLocalData({ ...localData, photoURL: newPhotoURL });

    setIsEditing(false);
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 2xl:w-fit">
      <Avatar className="h-auto w-52" src={avatarSrc ?? ""} />
      {isEditing ? (
        <UploadImageToS3 onUploadSuccess={onUploadSuccess} />
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          variant="primary"
          size="fullWidth"
          className="md:w-80"
        >
          <FileEdit />
          Editar Foto de Perfil
        </Button>
      )}
    </div>
  );
};

export default ChangeUserAvatar;
