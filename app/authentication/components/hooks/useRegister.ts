import { db } from "@/config/firebase";
import useAxios from "@/hooks/useAxios";
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
  const { axios } = useAxios();

  const sendRegisterInfo = async (
    formData: Pick<IRegisterFormData, "email" | "name" | "password">
  ) => {
    console.log(JSON.stringify(formData));
    const { data, status } = await axios.post(
      "/authentication/register",
      formData
    );

    if (!(status === 201)) {
      toast.error("Falha ao enviar dados para a API");
      return;
    }

    return data as IRegisterApiReturn;
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
