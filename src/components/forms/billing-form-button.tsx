"use client";

import { generateUserStripe } from "@/actions/generate-user-stripe";
import { Button } from "@/components/ui/button";
import { type SubscriptionPlan, type UserSubscriptionPlan } from "@/types";
import { Loader } from "lucide-react";
import { useTransition } from "react";

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
  let [isPending, startTransition] = useTransition();
  const generateUserStripeSession = generateUserStripe.bind(
    null,
    offer.stripeIds[year ? "yearly" : "monthly"],
  );

  const stripeSessionAction = () =>
    startTransition(async () => await generateUserStripeSession());

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Loader className="mr-2 size-4 animate-spin" /> Loading...
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
