import CustomInput from "@/components/input";
import React from "react";
import { useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import useValidation from "../hooks/useValidation";
import { IRegisterFormData } from "../types";

const StudentRegisterInputs: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterFormData>();
  const { onSubmit } = useRegister();
  const { emailValidationPattern } = useValidation();

  return (
    <form className="flex size-full flex-col" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label="Nome completo"
        type="text"
        {...register("name", {
          required: "É necessário inserir o seu nome",
          minLength: 2,
        })}
        placeholder="Insira o seu nome completo"
        error={errors.name?.message}
        onChange={(e) => setValue("name", e.target.value)}
      />
      <CustomInput
        label="E-mail"
        type="email"
        {...register("email", {
          required:
            "O campo de e-mail é obrigatório. Por favor, insira um endereço de e-mail válido.",
          pattern: {
            value: emailValidationPattern,
            message: "E-mail inválido",
          },
        })}
        placeholder="aluno@email.com"
        onChange={(e) => setValue("email", e.target.value)}
      />
      {/* <CustomInput
        label="Código escolar"
        type="text"
        {...register("linkedSchool", { required: true })}
        placeholder="Insira o código fornecido pela sua escola"
        error={errors.linkedSchool?.message}
        onChange={(e) => setValue("linkedSchool", e.target.value)}
      /> */}
      <CustomInput
        label="Senha"
        type="password"
        {...register("password", {
          required: true,
          minLength: 8,
          validate: (val: string) => {
            if (watch("confirmPassword") != val) {
              return "Verifique sua senha e tente novamente";
            }
          },
        })}
        placeholder="*******"
        error={errors.password?.message}
        onChange={(e) => setValue("password", e.target.value)}
      />
      <CustomInput
        label="Confirmar senha"
        type="password"
        {...register("confirmPassword", { required: true, minLength: 8 })}
        placeholder="*******"
        error={errors.password?.message}
        onChange={(e) => setValue("confirmPassword", e.target.value)}
      />

      {children}
    </form>
  );
};

export default StudentRegisterInputs;
