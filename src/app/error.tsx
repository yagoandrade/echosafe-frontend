"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center space-y-4">
      <h2>Algo deu errado!</h2>
      <Button variant="primary" onClick={() => reset()}>
        Tentar de novo
      </Button>
    </div>
  );
}
