import { type SubscriptionPlan } from "types";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Pro",
    description: "For small institutions",
    benefits: [
      "Ideal for small institutions",
      "Advanced analytics and reporting",
      "Access to AI analysis tools",
      "Priority customer support",
    ],
    limitations: [
      "No custom branding",
      "Limited access to business resources.",
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
    description: "For big institutions",
    benefits: [
      "Ideal for big institutions",
      "Unlimited reports and data storage",
      "Real-time analytics and reporting",
      "Access to custom branding",
      "24/7 business customer support",
      "Personalized onboarding and account management.",
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
