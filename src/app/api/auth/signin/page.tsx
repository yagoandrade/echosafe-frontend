"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
    <>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <span>This field is required</span>}
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        {errors.password && <span>This field is required</span>}
        <button type="submit">Sign in with Email</button>
      </form>
    </>
  );
}
