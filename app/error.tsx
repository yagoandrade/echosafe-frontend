"use client";

import { Button } from "@/components/button";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <div>
      <h2>Algo deu errado!</h2>
      <Button variant="primary" onClick={() => reset()}>
        Tentar de novo
      </Button>
    </div>
  );
}
