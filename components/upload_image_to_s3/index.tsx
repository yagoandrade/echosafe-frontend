"use client";

import { useState } from "react";
import { Button } from "../button";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UploadImageToS3Props {
  onUploadSuccess: (filename: string) => void; // Define the type of the callback function
}

const UploadImageToS3: React.FC<UploadImageToS3Props> = ({
  onUploadSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.info("Por favor, selecione um arquivo para enviar.");
      return;
    }

    setIsUploading(true);

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    if (response.ok) {
      const { url, fields } = await response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        toast.success("Imagem enviada com sucesso!");
        onUploadSuccess(fields?.key);
        setFile(null);
      } else {
        console.error("S3 Upload Error:", uploadResponse);
        toast.error(
          "O envio da sua imagem falhou. Tente novamente mais tarde."
        );
      }
    } else {
      toast.error(
        "Houve um erro do nosso lado e nossa equipe já foi informada. Por favor, tente novamente mais tarde!"
      );
    }

    setIsUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full justify-center gap-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-1 sm:flex-nowrap lg:flex-col">
        <div
          key="1"
          className="flex w-full flex-col items-center justify-center md:w-80"
        >
          <div className="w-full">
            <Button
              className="relative cursor-pointer"
              variant="wrapper"
              size="fullWidth"
              type="button"
            >
              <input
                id="file"
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) setFile(files[0]);
                }}
                accept="image/png, image/jpeg"
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
              <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed p-2">
                <ImageIcon className="mr-4 size-6 min-h-fit min-w-fit text-gray-500" />
                <p className="truncate text-sm text-gray-500">
                  {file?.name ? file.name : "Selecione uma imagem"}
                </p>
              </div>
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isUploading || !file}
          size="fullWidth"
          className="w-full sm:w-1/4 lg:w-80"
        >
          {isUploading ? (
            <span className="flex items-center gap-x-1">
              <Loader2 className="mr-2 size-4 animate-spin" /> Enviando
            </span>
          ) : (
            <span>Enviar</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UploadImageToS3;
