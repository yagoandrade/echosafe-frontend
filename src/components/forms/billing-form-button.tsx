"use client";

import { generateUserStripe } from "@/actions/generate-user-stripe";
import { Button } from "@/components/ui/button";
import { type SubscriptionPlan, type UserSubscriptionPlan } from "types";
import { useTransition } from "react";
import { Spinner } from "../shared/loading-spinner";

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
}

export function BillingFormButton({
  year,
  offer,
  subscriptionPlan,
}: BillingFormButtonProps) {
  const [isPending, startTransition] = useTransition();
  const generateUserStripeSession = generateUserStripe.bind(
    null,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    offer.stripeIds[year ? "yearly" : "monthly"]!,
  );

  const stripeSessionAction = () =>
    startTransition(async (): Promise<void> => {
      await generateUserStripeSession();
      return;
    });

  return (
    <Button
      variant="primary"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Spinner />
          Sending you to Stripe...
        </>
      ) : (
        <>
          {subscriptionPlan.stripePriceId ===
          offer.stripeIds[year ? "yearly" : "monthly"]
            ? "Manage Subscription"
            : "Upgrade"}
        </>
      )}
    </Button>
  );
}
