"use client";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import SignInWithGoogleButton from "@/components/sign-in-with-google";

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
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const router = useRouter();

  const { status } = useSession();

  if (status === "authenticated") {
    window.location.href = "/";
  }

  const registerUser = api.post.registerUser.useMutation({
    onSuccess: () => {
      toast.success("Account created successfully");
      router.push("/api/auth/signin?csrf=true");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onSubmit = async ({ name, email, password }: RegisterData) => {
    console.log("here");
    registerUser.mutate({ name, email, password });
  };

  return (
    <form
      className="flex h-full min-h-screen w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-xs font-medium text-red-500">
                  {errors.name.message?.toString()}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "What you typed in does not match email format",
                  },
                })}
                type="email"
                placeholder="me@example.com"
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "The minimum length of password is 5",
                  },
                })}
              />
              {errors.password && (
                <p className="text-xs font-medium text-red-500">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <SignInWithGoogleButton />
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/api/auth/signin?csrf=true" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
