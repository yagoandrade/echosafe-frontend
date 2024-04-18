"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignInWithGoogleButton from "@/components/sign-in-with-google";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import SignInWithCredentials from "@/components/sign-in-with-credentials";
import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProvider, _setSelectedProvider] = useState<
    "credentials" | "email"
  >("credentials");

  const { status } = useSession();

  if (status === "authenticated") {
    window.location.href = "/";
  }

  return (
    <motion.div
      className="flex h-full min-h-screen w-full items-center justify-center"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Card className="mx-auto max-w-sm border-0 bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <SignInWithGoogleButton />
            <Separator />
            {selectedProvider === "credentials" && <SignInWithCredentials />}
            {/*
            TODO: Add verification for when a user's account is not registered, then turn it back on
            {selectedProvider === "email" && <SignInWithMagicLink />} */}
          </div>
          <div className="mt-4 flex flex-col gap-y-1 text-sm text-[#7f8093]">
            <span className="mb-2">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/api/auth/register"
                className="cursor-default font-medium text-[#838496] hover:underline"
              >
                Register here
              </Link>
            </span>

            {/*
            TODO: Add verification for when a user's account is not registered, then turn it back on
            <Separator />
            {selectedProvider === "credentials" ? (
              <Button
                variant="link"
                size="sm"
                className="text-[#838496]"
                onClick={() => setSelectedProvider("email")}
              >
                Sign in with a Magic Link
              </Button>
            ) : (
              <Button
                variant="link"
                size="sm"
                className="text-[#838496]"
                onClick={() => setSelectedProvider("credentials")}
              >
                Sign in with email and password
              </Button>
            )} */}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
