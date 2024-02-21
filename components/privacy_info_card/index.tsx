import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/button";
import Link from "next/link";
import { Eye, Fingerprint, Shield } from "lucide-react";

export function PrivacyInfoCard() {
  return (
    <Card className="mt-4 w-full">
      <CardContent className="space-y-4 py-4">
        <div className="flex items-start space-x-4">
          <div className="space-y-1">
            <Shield className="h-auto w-12" color="#E31C5F" />
            <h3 className="text-lg font-semibold">
              Meus dados aparecem quando eu faço denúncia?
            </h3>
            <p className="text-sm text-gray-500">
              Seus dados pessoais permanecem seguros a todo momento. A denúncia
              não inclui seu nome, e-mail ou foto.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="space-y-1">
            <Fingerprint className="h-auto w-12" color="#E31C5F" />
            <h3 className="text-lg font-semibold">
              A EchoSafe usa meus dados?
            </h3>
            <p className="text-sm text-gray-500">
              A EchoSafe apenas disponibiliza a personalização do perfil para
              que você se sinta em casa nesse aplicativo. Nós não usamos os seus
              dados e nem os tornamos públicos em momento algum.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="space-y-1">
            <Eye className="h-auto w-12" color="#E31C5F" />
            <h3 className="text-lg font-semibold">
              Que informação é pública pra escola?
            </h3>
            <p className="text-sm text-gray-500">
              Somente o seu ano escolar e turma. Nós não enviamos nenhuma outra
              informação do seu perfil.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full" variant="outline">
          <Link href="/privacy-policy">Saiba mais</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
