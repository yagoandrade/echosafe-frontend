import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const checkoutSession = await createCheckoutSession(); // session creation

const stripe = await stripePromise;

const {error} = await stripe!.redirectToCheckout({
  // Make the id field from the CheckoutSession creation API response
  // available to this file, so you can provide it as parameter here
  sessionId: checkoutSession.id
});
