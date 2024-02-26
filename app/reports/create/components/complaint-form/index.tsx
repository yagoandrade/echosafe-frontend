"use client";
import useReports from "@/app/hooks/reports";
import { Button } from "@/components/button";
import CheckBox from "@/components/checkbox";
import CustomInput from "@/components/input";
import FileInput from "@/components/input/components/file_input";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import AutoComplete from "../auto-complete";

export interface FormFields {
  description: string;
  victim: boolean;
  endosers: string[];
  categories: string[];
  files: string[];
  checkbox: boolean;
}

const ComplaintForm: React.FC = () => {
  const { register, setValue, handleSubmit, watch } = useForm<FormFields>();
  const { back } = useRouter();
  const { sendReport, loading } = useReports();
  const victimValue = watch("victim");

  return (
    <form className="w-full" onSubmit={handleSubmit(sendReport)}>
      <CustomInput
        {...register("description", { required: true })}
        type="text"
        label="O que aconteceu?"
        placeholder="Resuma o evento que aconteceu"
        onChange={(e) =>
          setValue("description", e.target.value, {
            shouldValidate: true,
          })
        }
      />

      <CheckBox
        label="Você foi a vítima?"
        {...register("victim")}
        defaultChecked={victimValue}
        onChange={(e) =>
          setValue("victim", e.target.checked, {
            shouldValidate: false,
          })
        }
      />
      <CustomInput
        {...register("endosers")}
        type="text"
        label="Insira o nome de até 3 pessoas (separado por vírgulas) que possam reforçar a denúncia"
        placeholder="Insira o nome da pessoa"
        onChange={(e) => {
          const values = e.target.value.split(",");
          setValue("endosers", values, {
            shouldValidate: true,
          });
        }}
      />
      <AutoComplete
        onChangeTags={(newTags) => setValue("categories", newTags)}
        {...register("categories", { required: false })}
      />

      <FileInput
        className="mb-3"
        label="Se houver, anexe provas do incidente (áudios, vídeos, imagens)"
        onFileSelect={(file) =>
          setValue("files", file, { shouldValidate: false })
        }
        {...register("files", { required: false })}
      />

      <CheckBox
        label="Eu confirmo que as informações aqui descritas são verdadeiras e que dar falso testemunho pode acarretar em punições severas da escola ou da justiça."
        {...register("checkbox", { required: true })}
        onChange={(e) =>
          setValue("checkbox", e.target.checked, {
            shouldValidate: true,
          })
        }
      />

      <div className="mt-3 flex flex-row">
        <Button variant="link" onClick={() => back()}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Enviando..." : "Enviar denúncia"}
        </Button>
      </div>
    </form>
  );
};

export default ComplaintForm;
