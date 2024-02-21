import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { ILogin, ILoginToken } from "./types";

const useLogin = () => {
  const { push } = useRouter();
  const [_, setCookie] = useCookies();

  const getEncodedExpiration = (tokens: ILoginToken) => {
    const decodedAccessToken = jwtDecode(tokens.access_token);
    const decodedRefreshToken = jwtDecode(tokens.refresh_token);

    const initialDate = "1970-01-01T00:00:00Z";

    const accessTokenInDate = new Date(initialDate);
    const refreshTokenInDate = new Date(initialDate);

    accessTokenInDate.setUTCSeconds(parseInt(`${decodedAccessToken.exp}`));
    refreshTokenInDate.setUTCSeconds(parseInt(`${decodedRefreshToken.exp}`));

    return {
      accessTokenExpiration: accessTokenInDate,
      refreshTokenExpiration: refreshTokenInDate,
    };
  };

  const saveOnCookies = async (tokens: ILoginToken) => {
    const { accessTokenExpiration, refreshTokenExpiration } =
      getEncodedExpiration(tokens);

    setCookie("access_token", tokens.access_token, {
      expires: new Date(`${accessTokenExpiration}`),
    });
    setCookie("refresh_token", tokens.refresh_token, {
      expires: new Date(`${refreshTokenExpiration}`),
    });
    setCookie("user", tokens.user, {
      expires: new Date(`${accessTokenExpiration}`),
    });
  };

  const sendLoginInfo = async ({ email, password }: ILogin) => {
    const response = await fetch("http://localhost:3000/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      toast.error("Falha ao enviar dados para a API");
      return;
    }

    return (await response.json()) as ILoginToken;
  };

  const login = async ({ email, password }: ILogin) => {
    try {
      const tokens = await sendLoginInfo({ email, password });
      if (!tokens) {
        return;
      }

      console.log(tokens);

      saveOnCookies(tokens);

      // if (!userCredential.photoURL) {
      //   await updateProfile(userCredential, {
      //     photoURL: getDefaultPhotoURL(userCredential.uid),
      //   });
      //   await updateCurrentUser(auth, userCredential);
      // }
      toast.success("Login feito com sucesso!");
      setTimeout(() => {
        push("/dashboard");
      }, 1000);
    } catch (e: any) {
      toast.error("Ocorreu um erro no seu login.");
    }
  };

  const onSubmit = async (data: ILogin) => {
    await login(data);
  };

  return { onSubmit };
};

export default useLogin;
