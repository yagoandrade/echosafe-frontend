"use client";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "O endereço deve ter formato de e-mail." })
    .min(2, {
      message: "O e-mail deve ter no mínimo 2 caracteres.",
    }),
});

interface EmailInviteModalProps {
  children: React.ReactNode;
}

export function EmailInviteModal({
  children,
}: Readonly<EmailInviteModalProps>) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Você enviou um convite para:", {
      description: JSON.stringify(data, null, 2),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Convidar por e-mail</DialogTitle>
          <DialogDescription>
            Chame alguém da sua instituição para fazer parte da EchoSafe.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="exemplo@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enviaremos um e-mail para a pessoa convidada se juntar à sua
                    equipe.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="primary" size="fullWidth">
              Enviar convite
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
