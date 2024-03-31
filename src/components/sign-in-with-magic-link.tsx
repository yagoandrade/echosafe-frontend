"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface LoginWithMagicLinkData {
  email: string;
}

const SignInWithMagicLink = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginWithMagicLinkData>();

  const onSubmit = async (data: LoginWithMagicLinkData) => {
    await signIn("email", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    })
      .then((res) => {
        if (res?.error) throw new Error(res.error);
        // Redirect is too fast to even show this message.
        toast.success("Check your email for the magic link.");
      })
      .catch((err) => {
        toast.error(err as string);
      });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address..."
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-xs font-medium text-red-500">Email is required</p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Send me a Magic Link to sign in
      </Button>
    </form>
  );
};

export default SignInWithMagicLink;
