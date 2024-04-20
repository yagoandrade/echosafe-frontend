"use client";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

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
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Link from "next/link";
import { Spinner } from "@/components/shared/loading-spinner";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(false);
      console.error(error);
      toast.error(error.message);
    },
  });

  const onSubmit = async ({ name, email, password }: RegisterData) => {
    setIsSubmitting(true);
    registerUser.mutate({ name, email, password });
  };

  return (
    <form
      className="flex h-full min-h-screen w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="mx-auto max-w-sm border-0 bg-transparent">
          <CardHeader>
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Enter your information to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <SignInWithGoogleButton />
              <Separator />
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
                  placeholder="Enter your email address..."
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
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Creating account..." : "Create an account"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-[#7f8093]">
              Already have an account?{" "}
              <Link
                href="/api/auth/signin?csrf=true"
                className="cursor-default font-medium text-[#1994ff] hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </form>
  );
}
