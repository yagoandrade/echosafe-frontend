"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignInWithGoogleButton from "@/components/sign-in-with-google";
import Link from "next/link";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await signIn("credentials", { ...data, callbackUrl: "/" });
    if (result.error) {
      alert(result.error);
    }
  };

  if (status === "authenticated") {
    router.push("/");
  }

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
                required
                {...register("email", { required: true })}
              />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password", { required: true })}
              />
              {errors.password && <span>This field is required</span>}
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
