"use client";

import { useEffect, useState } from "react";
import Step from "./step";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roles } from "./util";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ChangeUserAvatar from "@/components/shared/change-user-avatar";

const STEP_LENGTH = 4;

export default function Onboarding() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [role, setRole] = useState(roles.student.value);
  const [institutionCode, setInstitutionCode] = useState("");

  const [isFinishingOnboarding, setIsFinishingOnboarding] = useState(false);

  if (
    typeof window !== "undefined" &&
    status === "unauthenticated" &&
    !session
  ) {
    window.location.href = "/";
  }

  // Retrieve the step from localStorage or default to 1
  const [step, setStep] = useState(() =>
    typeof window !== "undefined"
      ? Number(window.localStorage.getItem("onboardingStep")) || 1
      : 1,
  );

  if (
    status === "authenticated" &&
    session?.user?.isOnboarded &&
    !isFinishingOnboarding
  ) {
    window.location.href = "/";
  }

  // Store the step in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("onboardingStep", String(step));
  }, [step]);

  const finishOnboarding: ReturnType<
    typeof api.post.finishOnboarding.useMutation
  > = api.post.finishOnboarding.useMutation({
    onSuccess: async () => {
      setIsFinishingOnboarding(true);
      await update({ isOnboarded: true });
      localStorage.removeItem("onboardingStep");
      toast.success("Onboarding complete! Welcome to EchoSafe");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        "There was an error completing onboarding. Please try again later.",
      );
    },
  });

  const handleCompleteOnboarding = async () => {
    finishOnboarding.mutate({
      institutionCode,
      role,
    });
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg shadow-xl dark:bg-[#20212e]">
      <div className="flex justify-between rounded p-8">
        {Array.from({ length: STEP_LENGTH }, (_, i) => (
          <Step key={i} step={i + 1} currentStep={step} />
        ))}
      </div>

      {step === 1 && (
        <section className="mt-8 space-y-3 px-8">
          <h2 className="mt-8 text-2xl font-semibold text-black dark:text-white">
            Welcome to EchoSafe, {session?.user.name}!
          </h2>
          <p className="mt-2 text-neutral-400">
            Welcome to EchoSafe. Let&apos;s get started by setting up your
            account.
          </p>
          <p className="mt-2 text-neutral-400">
            Click continue to go to the next step.
          </p>
        </section>
      )}

      {step === 2 && (
        <section className="mt-8 space-y-3 px-8">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Please input the code of your institution to gain access to the
            platform.
          </h2>
          <Input
            id="institutionCode"
            type="text"
            className="w-full"
            placeholder="Please insert the code of your institution (e.g. 123456)"
            value={institutionCode}
            onChange={(e) => setInstitutionCode(e.target.value)}
            minLength={6}
            maxLength={6}
          />
          <div className="flex w-full justify-end">
            <Button
              variant="link"
              onClick={() => {
                setInstitutionCode("");
                setStep(4);
              }}
            >
              I do not have a code
            </Button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="mt-8 space-y-3 px-8">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Please indicate which role best represents your position within your
            institution.
          </h2>
          <Select value={role} onValueChange={(value) => setRole(value)}>
            <SelectTrigger id="status" aria-label="Select status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(roles).map((role) => (
                <SelectItem value={role.value} key={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-2 text-neutral-400">
            Once you&apos;ve chosen your role, click &quot;Continue&quot; to
            proceed to the next step.
          </p>
        </section>
      )}

      {step === 4 && (
        <section className="mt-8 flex flex-col gap-y-4 px-8">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Customize Your Profile Picture (Optional)
          </h2>
          <ChangeUserAvatar />
          <p className="mt-2 text-neutral-400">
            It&apos;s optional, but you can set an avatar that represents you
            best.
          </p>
        </section>
      )}

      {step === 5 && (
        <section>
          <h2 className="mt-8 space-y-3 px-8 text-2xl font-semibold text-black dark:text-white">
            Bem-vindo ao EchoSafe!
          </h2>
          <p className="mt-2 px-8 text-neutral-400">
            Welcome aboard! Click &quot;Go to EchoSafe&quot; to finish.
          </p>
        </section>
      )}

      <div className="px-8 pb-8">
        <div className="mt-10 flex justify-between">
          <Button
            variant="secondary"
            onClick={() => setStep(step < 2 ? step : step - 1)}
            className={`${step === 1 ? "pointer-events-none opacity-50" : ""}`}
          >
            Back
          </Button>
          {step > STEP_LENGTH ? (
            <Button variant="provider" onClick={handleCompleteOnboarding}>
              Go to EchoSafe
            </Button>
          ) : (
            <Button
              variant="primary"
              disabled={
                (step === 2 && !role) ||
                (step === 3 && institutionCode.length < 6)
              }
              onClick={() => setStep(step > STEP_LENGTH ? step : step + 1)}
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
