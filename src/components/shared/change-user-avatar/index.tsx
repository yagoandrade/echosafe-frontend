"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileEdit } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import UploadImageToS3 from "./components/upload-image-to-s3";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { api } from "@/trpc/react";

const ChangeUserAvatar = () => {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const updateUserAvatar = api.post.updateUserAvatar.useMutation();

  const onUploadSuccess = async (filename: string) => {
    const newPhotoURL = `https://echosafe-images-bucket.s3.sa-east-1.amazonaws.com/${filename}`;

    if (session?.user) {
      updateUserAvatar.mutate({ image: newPhotoURL });
      await update({ image: newPhotoURL });
    }

    setIsEditing(false);
  };

  return (
    <div className="flex-center flex w-full flex-col items-center gap-4 text-black">
      <Avatar className="h-52 w-52 rounded-full">
        <AvatarImage
          src={session?.user.image as string | undefined}
          alt="Avatar"
          className="size-full object-cover"
        />
        <AvatarFallback>{session?.user.name?.[0] ?? "?"}</AvatarFallback>
      </Avatar>
      {isEditing ? (
        <UploadImageToS3 onUploadSuccess={onUploadSuccess} />
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          variant="primary"
          className="w-full gap-x-1 md:w-80"
        >
          <FileEdit size="1rem" />
          Edit your profile picture
        </Button>
      )}
    </div>
  );
};

export default ChangeUserAvatar;
