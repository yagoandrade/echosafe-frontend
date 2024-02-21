"use client";
import React, { useEffect } from "react";
import { InputProps } from "../../types";
import GeneralInput from "../general_input";
import type { IAutoComplete } from "./types";
import useImageConverter from "./useImageConverter";

const FileInput: React.FC<
  Pick<InputProps, "label" | "className"> & IAutoComplete
> = ({ label, className, onFileSelect, ...rest }) => {
  const { previewImage, handleFileChange, selectedFiles } = useImageConverter();
  useEffect(() => {
    onFileSelect?.(previewImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewImage]);

  return (
    <GeneralInput
      {...rest}
      label={label}
      type="file"
      className={`hidden ${className}`}
      suffix={
        <div className="flex w-2/3 items-center justify-center">
          <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.1668 4.18228H11.5002C9.4835 4.18228 7.85183 5.83228 7.85183 7.84895L7.8335 37.1823C7.8335 39.1989 9.46516 40.8489 11.4818 40.8489H33.5002C35.5168 40.8489 37.1668 39.1989 37.1668 37.1823V15.1823L26.1668 4.18228ZM29.8335 24.3489H24.3335V31.2239C24.3335 33.4973 22.4818 35.3489 20.2085 35.3489C17.9352 35.3489 16.0835 33.4973 16.0835 31.2239C16.0835 28.9506 17.9352 27.0989 20.2085 27.0989C21.0518 27.0989 21.8402 27.3556 22.5002 27.7956V20.6823H29.8335V24.3489ZM24.3335 17.0156V6.93228L34.4168 17.0156H24.3335Z"
                  fill="#2C2C2C"
                />
              </svg>

              {!!selectedFiles ? (
                <div className="mt-4">
                  <p>Arquivos selecionados:</p>
                  <ul>
                    {Array.from(selectedFiles).map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <p className="mb-2 text-sm">
                    Arraste os seus arquivos aqui ou clique para enviar um
                    arquivo
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    tamanho máximo de arquivo 100 MB
                  </p>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
          </label>
        </div>
      }
    />
  );
};

export default FileInput;
