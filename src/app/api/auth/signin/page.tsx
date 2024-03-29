"use client";

import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignInWithGoogleButton from "@/components/sign-in-with-google";
import Link from "next/link";
import { toast } from "sonner";

interface LoginData {
  email: string;
  password: string;
}

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { status } = useSession();

  if (status === "authenticated") {
    window.location.href = "/";
  }

  const onSubmit = async (data: LoginData) => {
    await signIn("credentials", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    })
      .then((res) => {
        if (res?.error) throw new Error(res.error);
        // Redirect is too fast to even show this message.
        // toast.success("Logged in successfully");
      })
      .catch((err) => {
        toast.error(err as string);
      });
  };

  return (
    <form
      className="flex h-full min-h-screen w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500">
                  Email is required
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-xs font-medium text-red-500">
                  Password is required
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <SignInWithGoogleButton />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account yet?{" "}
            <Link href="/api/auth/register" className="underline">
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
