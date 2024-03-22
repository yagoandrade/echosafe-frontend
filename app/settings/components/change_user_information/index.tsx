"use client";
import { Button } from "@/components/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { INSTITUTION_CODES } from "@/lib/utils";
import { useCurrentUserStore } from "@/store/currentUser";
import { auth } from "@/config/firebase";
import { getDatabase, ref, update } from "firebase/database";
import useAxios from "@/hooks/useAxios";

type FormFields =
  | "displayName"
  | "email"
  | "password"
  | "confirmPassword"
  | "institutionCode"
  | "class"
  | "role";

const formSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  email: z.string().email().min(1).optional(),
  password: z.string().min(8).optional(),
  confirmPassword: z.string().min(8).optional(),
  institutionCode: z.string().min(6).max(50).optional(),
  class: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
});

const ChangeUserInformation = () => {
  const { userData, setUserData } = useCurrentUserStore();

  const [isEditing, setIsEditing] = useState({
    displayName: false,
    email: false,
    password: false,
    confirmPassword: false,
    institutionCode: false,
    class: false,
    role: false,
  });

  const toggleEdit = (field: FormFields) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const user = auth.currentUser;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user?.displayName ?? userData.name ?? "",
      email: userData.email,
      institutionCode: userData.linkedSchool,
      role: userData.role,
    },
  });

  const { axios } = useAxios();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.displayName) await axios("users/", { displayName: values.displayName });
      await updateProfile(user!, {
        displayName: values.displayName,
      });

      if (values.email) {
        await updateEmail(user!, values.email);
      }

      if (values.institutionCode) {
        const db = getDatabase();
        update(ref(db, "users/" + userData.id), {
          linkedSchool: values.institutionCode,
        });
      }

      if (values.role) {
        const db = getDatabase();
        update(ref(db, "users/" + userData.id), {
          role: values.role,
        });
      }

      setUserData({ ...userData, ...values });
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  }

  const renderFormField = (
    name: FormFields,
    label: string,
    placeholder: string,
    upperCase = false
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-wrap justify-between gap-x-3 sm:flex-nowrap lg:gap-x-8">
          <div className="flex w-full flex-col flex-wrap space-y-2 xs:flex-nowrap">
            <FormLabel className="text-base sm:text-sm">{label}</FormLabel>
            {isEditing[name] ? (
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="w-full text-base sm:text-sm"
                  {...field}
                />
              </FormControl>
            ) : (
              <p
                className={`w-fit text-[#717171] sm:text-sm ${
                  upperCase && "uppercase"
                }`}
              >
                {form.getValues(name)}
                {/* {name !== "institutionCode"
                  ? form.getValues(name)
                  : INSTITUTION_CODES.get(form.getValues("institutionCode")!)} */}
              </p>
            )}
            {name === "institutionCode" &&
            isEditing[name] &&
            INSTITUTION_CODES.get(form.getValues("institutionCode")!) ? (
              <p className="text-xs text-[#717171]">
                {`${form.getValues(
                  "institutionCode"
                )} - ${INSTITUTION_CODES.get(
                  form.getValues("institutionCode")!
                )}`}
              </p>
            ) : null}
            <FormMessage />
          </div>
          <FormDescription className="flex w-full items-center gap-1 sm:w-fit">
            {isEditing[name] && (
              <Button
                variant="secondary"
                className="w-full sm:w-fit"
                onClick={() => {
                  toggleEdit(name);
                  form.resetField(name);
                  form.clearErrors(name);
                }}
              >
                Cancelar
              </Button>
            )}

            {name !== "institutionCode" || userData.role !== "school" ? (
              <Button
                variant="outline"
                className="w-full sm:w-fit"
                type={!isEditing[name] ? "submit" : "button"}
                onClick={() => {
                  // TODO: Only set is editing field to false if it was successful
                  toggleEdit(name);
                }}
                disabled={isEditing[name] && !form.getValues(name)}
              >
                {isEditing[name] ? "Salvar" : "Editar"}
              </Button>
            ) : null}
          </FormDescription>
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 xl:w-full"
      >
        {renderFormField(
          "displayName",
          "Nome",
          user?.displayName ?? "Insira seu novo nome"
        )}
        <Separator />
        {renderFormField(
          "email",
          "E-mail",
          user?.email ?? "Insira seu novo e-mail"
        )}
        {/* TODO: Reativar o campo de classe quando soubermos qual turma o usuário está cadastrado através do código(?) */}
        {/* TODO: Precisamos discutir isso ^^^ */}
        {/* {renderFormField("class", "Turma", "3º Ano C", true)}
        <Separator /> */}
        {/* {renderFormField("role", "Cargo", "Insira seu novo cargo", true)} */}
      </form>
    </Form>
  );
};

export default ChangeUserInformation;
