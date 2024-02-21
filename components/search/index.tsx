"use client";

import { cn } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";
import { SetStateAction, useState } from "react";

interface SearchProps {
  className?: string;
}

const Search = ({ className = "" }: SearchProps) => {
  const [text, setText] = useState("");

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setText(e.target.value);

  return (
    <div
      className={cn(
        "border border-[#e4e4e7] rounded-lg p-2 px-4 bg-white flex gap-x-4 w-full text-sm items-center h-3/4",
        className
      )}
    >
      <SearchIcon
        color="#a1a1aa"
        className="min-h-[1.1rem] min-w-fit"
        size="1.1rem"
      />
      <input
        type="text"
        placeholder="Digite para pesquisar..."
        className="w-full text-sm text-[#a1a1aa] outline-0 md:text-base"
        onChange={handleInputChange}
        value={text}
      />
      {text.length > 0 && (
        <button onClick={() => setText("")}>
          <X color="#a1a1aa" />
        </button>
      )}
    </div>
  );
};

export default Search;
