import { Message } from "react-hook-form";

export type InputProps = {
  label: string;
  type: "email" | "password" | "text" | "time" | "file";
  suffix?: JSX.Element;
  register?: Object;
  placeholder?: string;
  className?: string;
  isOptional?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: Message;
};
