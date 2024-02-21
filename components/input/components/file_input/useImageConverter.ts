import React, { useState } from "react";

const useImageConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  const readFilesSequentially = async (files: FileList) => {
    for (const file of files) {
      const imageDataUrl = await readSingleFile(file);
      setPreviewImage((prev) => [...prev, imageDataUrl]);
    }
  };

  const readSingleFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setPreviewImage([]);
    setSelectedFiles(files);

    if (!!files) {
      readFilesSequentially(files);
    } else {
      setPreviewImage([]);
    }
  };

  return { handleFileChange, previewImage, selectedFiles };
};

export default useImageConverter;
