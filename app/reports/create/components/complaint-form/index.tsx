"use client";
import { Button } from "@/components/button";
import CheckBox from "@/components/checkbox";
import CustomInput from "@/components/input";
import FileInput from "@/components/input/components/file_input";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { InputKey, inputs } from "../../utils";
import AutoComplete from "../auto-complete";
import useComplaintSubmitForm from "./useComplaintSubmitForm";

const ComplaintForm: React.FC = () => {
  const { register, watch, handleSubmit, setValue, formState } = useForm<any>();
  const { back } = useRouter();
  const { onSubmit, isLoading } = useComplaintSubmitForm();

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(inputs).map((input, _) => {
        const convertedInputType: InputKey = input as InputKey;
        const label = inputs[convertedInputType].title;
        const complaintKey = inputs[convertedInputType].key;
        const placeholder = inputs[convertedInputType].placeholder;
        const isTimeInputType = input === "time";

        return isTimeInputType ? (
          <div className="flex w-full flex-row gap-4" key={input}>
            {/*
              TODO: Descomentar essa parte do código quando estivermos arrumando o input de datetime
            {Object.keys(inputs[input]!).map((time, _) => {
              const convertedTimeType: TimeInputKey = time as TimeInputKey;
              return (
                <CustomInput
                  {...register(`${convertedTimeType}`, { required: true })}
                  onChange={(e) =>
                    setValue(convertedTimeType, e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  key={time}
                  label={inputs.time[convertedTimeType].title}
                  placeholder={inputs.time[convertedTimeType].placeholder}
                  type="time"
                />
              );
            })} */}
          </div>
        ) : (
          <CustomInput
            {...register(complaintKey, { required: true })}
            type="text"
            label={label}
            placeholder={placeholder}
            key={input}
            onChange={(e) =>
              setValue(complaintKey, e.target.value, {
                shouldValidate: true,
              })
            }
          />
        );
      })}
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
          setValue("checkbox", e.target.value, {
            shouldValidate: true,
          })
        }
      />
      <div className="mt-3 flex flex-row">
        <Button variant={"link"} onClick={() => back()}>
          Cancelar
        </Button>
        <Button type="submit" variant={"primary"} disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar denúncia"}
        </Button>
      </div>
    </form>
  );
};

export default ComplaintForm;
