"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { type z } from "zod";
import { formSchemaSignin } from "./schemas";

export type FormTypeSignin = z.infer<typeof formSchemaSignin>;

export const useFormSignin = () =>
  useForm<FormTypeSignin>({
    resolver: zodResolver(formSchemaSignin),
  });
