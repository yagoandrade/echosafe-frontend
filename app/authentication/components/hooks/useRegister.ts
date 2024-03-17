import { db } from "@/config/firebase";
import useAxios from "@/hooks/useAxios";
import { ref, update } from "firebase/database";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "../../store/auth";
import useLogin from "../login_inputs/useLogin";
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
  const { onSubmit: onLoginSubmit } = useLogin();

  const sendRegisterInfo = async (
    formData: Pick<IRegisterFormData, "email" | "name" | "password" | "role">
  ) => {
    console.log(formData, "formdata");
    const { data, status } = await axios.post(
      "/authentication/register",
      formData
    );
    console.log(data, status, "data astatus");

    if (status !== 201) {
      toast.error("Falha ao enviar dados para a API");
      return;
    }

    return data as IRegisterApiReturn;
  };

  const register = async (data: IRegisterFormData) => {
    try {
      const userData = await sendRegisterInfo({
        ...data,
        role: currentAuthState === "school" ? "collaborator" : "student",
      });
      console.log("user data register", userData);

      if (!userData) return;

      await sendDataToFirebase({
        ...data,
        uid: userData.id,
      });

      toast.message("Conta criada com sucesso!");
      setTimeout(() => {
        onLoginSubmit({ email: userData.email, password: data.password });
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
