"use server";

import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

const billingUrl = absoluteUrl("/pricing");

export async function generateUserStripe(
  priceId: string,
): Promise<responseAction> {
  let redirectUrl = "/dashboard";

  try {
    const session = await getServerAuthSession();

    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.email);

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url;
    } else {
      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: session.user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userEmail: session.user.email,
        },
      });

      redirectUrl = stripeSession.url!;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to generate user stripe session.");
  }

  // no revalidatePath because redirect
  redirect(redirectUrl);
}
