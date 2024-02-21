"use client";
import { Button } from "@/components/button";
import Toggle from "@/components/toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyCaptcha } from "@/lib/server";
import { cn } from "@/lib/utils";
import LoginBgImage from "@/public/assets/background-echosafe.png";
import Logo from "@/public/assets/svg/mockup-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuthStore } from "../../store/auth";
import LoginInputs from "../login_inputs";
import SchoolRegisterInputs from "../school_register_inputs";
import StudentRegisterInputs from "../students_register_inputs";
import type { AuthFormRendererProps } from "./types";
import { strings } from "./utils";

interface SubmitButtonProps {
  recaptchaRef: React.RefObject<ReCAPTCHA>;
  handleCaptchaSubmission: (token: string | null) => void;
  isVerified: boolean;
  label: string;
}

const SubmitButton = ({
  recaptchaRef,
  handleCaptchaSubmission,
  isVerified,
  label,
}: SubmitButtonProps) => (
  <div className="flex w-full flex-col justify-center space-y-3">
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      ref={recaptchaRef}
      onChange={handleCaptchaSubmission}
    />
    <Button type="submit" size="fullWidth" disabled={!isVerified}>
      {label}
    </Button>
  </div>
);

const AuthFormRenderer: React.FC<AuthFormRendererProps> = ({ mode }) => {
  const { currentAuthState } = useAuthStore();
  const currentAuthStateEqualsToSchool = currentAuthState === "school";
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false));
  }

  const getRenderByMode = () => {
    if (mode === "signin") {
      return (
        <LoginInputs>
          <div className="mt-auto space-y-3">
            <SubmitButton
              recaptchaRef={recaptchaRef}
              handleCaptchaSubmission={handleCaptchaSubmission}
              isVerified={isVerified}
              label={strings.buttonLabel[mode]}
            />
            <div className="text-sm text-[#808080]">
              Não possui uma conta?{" "}
              <Link
                className="font-semibold text-[#4F46E5] hover:underline hover:opacity-90"
                href="authentication?mode=signup"
              >
                Registre-se
              </Link>
            </div>
          </div>
        </LoginInputs>
      );
    } else {
      return currentAuthStateEqualsToSchool ? (
        <SchoolRegisterInputs>
          <div className="mt-auto space-y-3">
            <SubmitButton
              recaptchaRef={recaptchaRef}
              handleCaptchaSubmission={handleCaptchaSubmission}
              isVerified={isVerified}
              label={strings.buttonLabel[mode]}
            />
            <div className="text-sm text-[#808080]">
              Já possui uma conta?{" "}
              <Link
                className="font-semibold text-[#4F46E5] hover:underline hover:opacity-90"
                href="authentication?mode=signin"
              >
                Entrar
              </Link>
            </div>
          </div>
        </SchoolRegisterInputs>
      ) : (
        <StudentRegisterInputs>
          <div className="mt-auto space-y-3">
            <SubmitButton
              recaptchaRef={recaptchaRef}
              handleCaptchaSubmission={handleCaptchaSubmission}
              isVerified={isVerified}
              label={strings.buttonLabel[mode]}
            />
            <div className="text-sm text-[#808080]">
              Já possui uma conta?{" "}
              <Link
                className="font-semibold text-[#4F46E5] hover:underline hover:opacity-90"
                href="authentication?mode=signin"
              >
                Entrar
              </Link>
            </div>
          </div>
        </StudentRegisterInputs>
      );
    }
  };

  return (
    <main className="flex size-full min-h-screen flex-row items-center justify-start">
      <Image
        src={LoginBgImage}
        alt=""
        className="absolute top-0 hidden size-full min-h-screen object-cover object-center xs:block"
      />
      <Card className="z-10 mx-auto flex h-full min-h-fit flex-col items-center justify-center rounded-2xl xs:w-[90vw] lg:m-16 lg:w-fit lg:max-w-sm">
        <CardHeader className="my-3 w-full space-y-0">
          <Image
            src={Logo}
            alt="Logo da EchoSafe"
            width={170}
            height={170}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-lg">{strings.title[mode]}</CardTitle>
          <CardDescription className={cn("mt-0", mode === "signup" && "pb-3")}>
            para prosseguir para o EchoSafe
          </CardDescription>
          {mode === "signup" && <Toggle />}
        </CardHeader>
        <CardContent className="flex min-h-full w-full flex-col">
          {getRenderByMode()}
        </CardContent>
      </Card>
    </main>
  );
};

export default AuthFormRenderer;
