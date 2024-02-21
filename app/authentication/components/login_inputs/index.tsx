import CustomInput from "@/components/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth";
import useValidation from "../hooks/useValidation";
import type { ILogin } from "./types";
import useLogin from "./useLogin";

const LoginInputs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentAuthState } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILogin>();

  const { onSubmit } = useLogin();
  const { emailValidationPattern } = useValidation();

  return (
    <form className="flex size-full flex-col" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label="E-mail"
        type="text"
        {...register("email", {
          required:
            "O campo de e-mail é obrigatório. Por favor, insira um endereço de e-mail válido.",
          pattern: {
            value: emailValidationPattern,
            message: "E-mail inválido",
          },
        })}
        placeholder="Insira seu e-mail"
        error={errors.email?.message as string | undefined}
        onChange={(text) => setValue("email", text.currentTarget.value)}
      />
      <CustomInput
        label="Senha"
        type="password"
        {...register("password", {
          required: "A senha é obrigatória. Por favor, insira uma senha.",
        })}
        placeholder="********"
        error={errors.password?.message as string | undefined}
        onChange={(text) => setValue("password", text.currentTarget.value)}
      />
      {children}
    </form>
  );
};

export default LoginInputs;
