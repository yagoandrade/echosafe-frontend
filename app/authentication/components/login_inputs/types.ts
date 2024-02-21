import { IRegisterApiReturn } from "../hooks/types";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginToken {
  access_token: string;
  refresh_token: string;
  user: IRegisterApiReturn;
}
