// TODO: Fix this when we turn strict mode on.
import { pricingData } from "@/config/subscriptions";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { type UserSubscriptionPlan } from "types";

export async function getUserSubscriptionPlan(
  userEmail: string,
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      email: userEmail,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is on a paid plan.
  const isPaid =
    user.stripePriceId &&
    (user.stripeCurrentPeriodEnd?.getTime() ?? 0) + 86_400_000 > Date.now()
      ? true
      : false;

  // Find the pricing data corresponding to the user's plan
  const userPlan =
    pricingData.find((plan) => plan.stripeIds.monthly === user.stripePriceId) ??
    pricingData.find((plan) => plan.stripeIds.yearly === user.stripePriceId);

  const plan = isPaid && userPlan ? userPlan : pricingData[0];

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === user.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === user.stripePriceId
        ? "year"
        : null
    : null;

  let isCanceled = false;
  if (isPaid && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime() ?? 0,
    isPaid,
    interval,
    isCanceled,
  } as UserSubscriptionPlan;
}
