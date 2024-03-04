import { LogIn, Plus } from "lucide-react";
import { IManager } from "./types";

const SchoolManagement: React.FC<IManager> = ({ variant }) => {
  return (
    <div className="mb-8 flex size-[290px] flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 p-8 shadow-md">
      {variant === "create" ? <Plus size={42} /> : <LogIn size={42} />}
      <span className="text-base font-semibold">
        {variant === "create" ? "Criar uma escola" : "Entrar numa escola"}
      </span>
    </div>
  );
};

export default SchoolManagement;
