import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ICard } from "./types";

const Card: React.FC<ICard> = ({ name, image, onChooseSchool }) => {
  return (
    <div className="flex size-[290px] flex-col items-center justify-center rounded-xl bg-white p-8 shadow-md">
      <Image
        alt="imagem da escola"
        src={`${image}`}
        width={200}
        height={185}
        style={{ objectFit: "contain" }}
      />
      <div className="flex flex-col self-start">
        <span className=" text-base font-bold">{name}</span>
        <Link onClick={onChooseSchool} href={"/dashboard"}>
          Entrar -{">"}
        </Link>
      </div>
    </div>
  );
};

export default Card;
