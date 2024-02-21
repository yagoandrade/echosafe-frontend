import { Button } from "@/components/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex size-full min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-7 p-4">
      <Image
        src="https://http.cat/images/404.jpg"
        alt="404-cat"
        width={450}
        height={450}
      />
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-semibold">
          Ops! Parece que essa página não existe!
        </h1>
        <div className="flex w-full flex-col space-y-2">
          <Button variant="outline" asChild>
            <Link href="/support">Entre em contato com o suporte</Link>
          </Button>
          <Button variant="primary" asChild>
            <Link href="/dashboard">Ir à página principal</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
