import { db } from "@/config/firebase";
import { ref, update } from "firebase/database";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "../../store/auth";
import type { IRegisterFormData } from "../types";
import { IRegisterApiReturn } from "./types";
import { generateRandomCode } from "./utils";

interface FirebaseUpdates {
  [key: string]: any;
}

const useRegister = () => {
  const { push: routerPush } = useRouter();
  const { currentAuthState } = useAuthStore();

  const sendRegisterInfo = async (
    data: Pick<IRegisterFormData, "email" | "name" | "password">
  ) => {
    const response = await fetch(
      "http://localhost:3000/authentication/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      toast.error("Falha ao enviar dados para a API");
      return;
    }

    return (await response.json()) as IRegisterApiReturn;
  };

  const register = async (data: IRegisterFormData) => {
    try {
      const userData = await sendRegisterInfo(data);

      if (!userData) return;

      await sendDataToFirebase({
        ...data,
        uid: userData.id,
      });

      toast.message(
        "Verifique seu e-mail, confirme sua conta e faça login novamente"
      );
      setTimeout(() => {
        routerPush("/");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const sendDataToFirebase = async (
    data: IRegisterFormData & { uid: string }
  ) => {
    const updates: FirebaseUpdates = {};
    const schoolCode = generateRandomCode();

    if (currentAuthState === "school") {
      updates[`schools/${schoolCode}`] = {
        schoolName: data.name,
        uid: data.uid,
        code: schoolCode,
        team: {},
        students: {},
      };
    }

    updates[`users/${data.uid}`] = {
      email: data.email,
      name: data.name,
      role: currentAuthState,
    };

    await update(ref(db), updates);
  };

  const onSubmit = async (data: IRegisterFormData) => {
    await register(data);
  };

  return { onSubmit };
};

export default useRegister;
