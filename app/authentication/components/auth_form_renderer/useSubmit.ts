import type { AuthFormRendererProps } from "./types";
import { useAuthStore } from "../../store/auth";
import { SubmitHandler } from "react-hook-form";
import type { AuthRegister } from "../form/types";

export const useSubmit = ({ mode }: AuthFormRendererProps) => {
  const { currentAuthState } = useAuthStore();
  const isSchool = currentAuthState === "school";

  // TODO: mudar isso dps qd tiver com a parte de auth pronta
  const endpointsByMode = {
    school: {
      signin: "api/login/school",
      signup: "api/register/school",
    },
    student: {
      signin: "api/login/student",
      signup: "api/register/student",
    },
  };

  const getApiEndpoint = (action: "signin" | "signup") => {
    return endpointsByMode[currentAuthState][action];
  };

  const onSubmit: SubmitHandler<AuthRegister> = () => {
    console.log("POST");
  };

  return { onSubmit };
};
