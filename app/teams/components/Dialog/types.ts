export interface IDialog {
  variant: "join" | "create";
  trigger: React.ReactNode;
  onSubmit: (value: string) => void;
}
