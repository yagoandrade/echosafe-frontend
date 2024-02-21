import type { HTMLAttributes } from "react";

export interface ICheckBox extends HTMLAttributes<HTMLInputElement> {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
