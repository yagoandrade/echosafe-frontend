import type { AuthFormType } from "@/app/authentication/components/form/types";

export interface IOption {
  labels: Array<string>;
  selected: AuthFormType;
  onToggle: () => void;
}
