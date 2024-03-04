"use client";
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { IDialog } from "./types";

const SchoolDialog: React.FC<IDialog> = ({ variant, trigger, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const dialogProps = {
    join: { title: "Entrar em uma escola", input: "Código" },
    create: { title: "Criar uma escola", input: "Nome da escola" },
  }[variant];

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{dialogProps.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            {dialogProps.input}
          </Label>
          <Input
            id="name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button
            variant={"outline"}
            type="submit"
            onClick={() => {
              onSubmit(inputValue);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }}
          >
            {"Submeter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchoolDialog;
