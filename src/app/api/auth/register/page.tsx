"use client";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = api.post.registerUser.useMutation({
    onSuccess: () => {
      setName("");
      setEmail("");
      setPassword("");
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        registerUser.mutate({ name, email, password });
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        required
      />
      {errors.name && <span>This field is required</span>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      {errors.email && <span>This field is required</span>}
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        required
      />
      {errors.password && <span>This field is required</span>}
      <button type="submit">Register</button>
    </form>
  );
}
