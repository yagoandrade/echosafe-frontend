"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  _error,
  reset,
}: Readonly<{
  _error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center space-y-4">
      <h2>Something went terribly wrong!</h2>
      <Button variant="primary" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
