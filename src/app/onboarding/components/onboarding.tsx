"use client";

import { useEffect, useState } from "react";
import Step from "./step";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/trpc/react";

const STEP_LENGTH = 4;

export default function Onboarding() {
  return (
    <SessionProvider>
      <OnboardingContent />
    </SessionProvider>
  );
}

export function OnboardingContent() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    window.location.href = "/";
  }

  // Retrieve the step from localStorage or default to 1
  const [step, setStep] = useState(
    () => Number(localStorage.getItem("onboardingStep")) || 1,
  );

  // Store the step in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("onboardingStep", String(step));
  }, [step]);

  const finishOnboarding: ReturnType<
    typeof api.post.finishOnboarding.useMutation
  > = api.post.finishOnboarding.useMutation({
    onSuccess: () => {
      localStorage.removeItem("onboardingStep");
      toast.success("Onboarding complete! Welcome to ThePlatform™");
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        "There was an error completing onboarding. Please try again later.",
      );
    },
  });

  const handleCompleteOnboarding = async () => {
    finishOnboarding.mutate();
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-[#20212e] shadow-xl">
      <div className="flex justify-between rounded p-8">
        {Array.from({ length: STEP_LENGTH }, (_, i) => (
          <Step key={i} step={i + 1} currentStep={step} />
        ))}
      </div>

      {step === 1 && (
        <section>
          <h2 className="mt-8 px-8 text-2xl font-semibold">
            Welcome to ThePlatform™
          </h2>
          <p className="mt-2 px-8 text-neutral-400">
            Welcome to ThePlatform™. Let&apos;s get started by setting up your
            account.
          </p>
          <p className="mt-2 px-8 text-neutral-400">
            Click continue to go to the next step.
          </p>
        </section>
      )}

      {step === 2 && (
        <section>
          <h2 className="mt-8 px-8 text-2xl font-semibold">Step 2</h2>
          <p className="mt-2 px-8 text-neutral-400">
            This is the second step. Click continue to go to the next step.
          </p>
        </section>
      )}

      {step === 3 && (
        <section>
          <h2 className="mt-8 px-8 text-2xl font-semibold">Step 3</h2>
          <p className="mt-2 px-8 text-neutral-400">
            This is the third step. Click continue to go to the next step.
          </p>
        </section>
      )}

      {step === 4 && (
        <section>
          <h2 className="mt-8 px-8 text-2xl font-semibold">Step 4</h2>
          <p className="mt-2 px-8 text-neutral-400">This is the fourth step.</p>
        </section>
      )}

      {step === 5 && (
        <section>
          <h2 className="mt-8 px-8 text-2xl font-semibold">Done!</h2>
          <p className="mt-2 px-8 text-neutral-400">
            You are done! Click go to ThePlatform™ to finish.
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
            <Button
              variant="provider"
              onClick={handleCompleteOnboarding}
              asChild
            >
              <Link href="/">Go to ThePlatform™</Link>
            </Button>
          ) : (
            <Button
              variant="primary"
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
