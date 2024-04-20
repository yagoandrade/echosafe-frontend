import { type SubscriptionPlan } from "types";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Pro",
    description:
      "Designed for small institutions seeking advanced analytics solutions.",
    benefits: [
      "Ideal for small institutions seeking robust analytical capabilities.",
      "Gain access to advanced analytics and reporting tools for comprehensive insights.",
      "Utilize AI analysis tools to enhance decision-making processes",
      "Enjoy priority customer support for swift assistance and issue resolution",
    ],
    limitations: [
      "Custom branding features are not available",
      "Access to business resources is limited",
    ],
    prices: {
      monthly: 149.95,
      yearly: 1200,
    },
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID!,
    },
  },
  {
    title: "Business",
    description:
      "Tailored for big institutions requiring extensive analytics and branding capabilities.",
    benefits: [
      "Perfect for big institutions needing unlimited reports and data storage",
      "Enjoy real-time analytics and reporting for up-to-the-minute insights",
      "Access custom branding features to maintain a consistent brand identity across all platforms",
      "Receive 24/7 business customer support for immediate assistance",
      "24/7 business customer support",
      "Benefit from personalized onboarding and dedicated account management for a seamless experience",
    ],
    limitations: [],
    prices: {
      monthly: 299.95,
      yearly: 3000,
    },
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID!,
    },
  },
];
