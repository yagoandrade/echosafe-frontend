import { MenuSectionProps } from "../menu-item/types";

const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-sm font-light uppercase text-[#A1A1AA]">{title}</h1>
      {children}
    </div>
  );
};

export default MenuSection;
