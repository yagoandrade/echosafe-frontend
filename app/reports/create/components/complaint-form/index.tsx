"use client";
import useReports from "@/app/hooks/reports";
import { Button } from "@/components/button";
import CheckBox from "@/components/checkbox";
import CustomInput from "@/components/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AutoComplete from "../auto-complete";
import Tag from "../tag";

export interface FormFields {
  description: string;
  victim: boolean;
  endosers: string[];
  categories: string[];
  checkbox: boolean;
}

const ComplaintForm: React.FC = () => {
  const { register, setValue, handleSubmit, watch, getValues } =
    useForm<FormFields>();
  const router = useRouter();
  const { back } = router;
  const { sendReport, loading } = useReports();
  const victimValue = watch("victim");
  const [endosers, setEndosers] = useState<string[]>([]);
  const [endosersText, setEndosersText] = useState<string>("");

  const handleAddEndorser = () => {
    if (endosers.length < 3) {
      setEndosers((prevEndosers) => [...prevEndosers, endosersText]);
      setEndosersText("");
    }
  };

  useEffect(() => {
    setValue("endosers", endosers);
  }, [endosers, setValue]);

  return (
    <form className="w-full" onSubmit={handleSubmit(sendReport)}>
      <CustomInput
        {...register("description", { required: true })}
        type="text"
        label="O que aconteceu?"
        placeholder="Resuma o evento que aconteceu"
        onChange={(e) =>
          setValue("description", e.target.value, { shouldValidate: true })
        }
      />

      <CheckBox
        label="Você foi a vítima?"
        {...register("victim")}
        defaultChecked={victimValue}
        onChange={(e) =>
          setValue("victim", e.target.checked, { shouldValidate: false })
        }
      />

      <div className="mb-4 mt-2">
        <CustomInput
          {...register("endosers")}
          type="text"
          label="Insira o nome de até 3 pessoas que possam reforçar a denúncia"
          placeholder="Insira o nome da pessoa"
          onChange={(e) => setEndosersText(`${e.target?.value}`)}
        />
        <div className="flex flex-row items-center gap-12">
          <Button
            type="button"
            disabled={endosers.length === 3}
            onClick={handleAddEndorser}
          >
            Adicionar
          </Button>
          <Tag cn="" onRemoveTag={() => {}} tags={endosers} remove />
        </div>
      </div>

      <AutoComplete
        onChangeTags={(newTags) => setValue("categories", newTags)}
        {...register("categories", { required: false })}
      />

      <CheckBox
        label="Eu confirmo que as informações aqui descritas são verdadeiras e que dar falso testemunho pode acarretar em punições severas da escola ou da justiça."
        {...register("checkbox", { required: true })}
        onChange={(e) =>
          setValue("checkbox", e.target.checked, { shouldValidate: true })
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
