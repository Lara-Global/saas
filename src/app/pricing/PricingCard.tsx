"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe.js client
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type PricingCardProps = {
    isYearly?: boolean;
    title: string;
    monthlyPrice?: number;
    yearlyPrice?: number;
    description: string;
    features: string[];
    actionLabel: string;
    popular?: boolean;
    exclusive?: boolean;
};

const PricingCard = ({
    isYearly,
    title,
    monthlyPrice,
    yearlyPrice,
    description,
    features,
    actionLabel,
    popular,
    exclusive,
}: PricingCardProps) => {
    const router = useRouter();

    const handleButtonClick = async () => {
        if (actionLabel === "Contact Sales") {
            router.push('/contact');
        } else {
            const stripe = await stripePromise;

            const price = isYearly ? yearlyPrice : monthlyPrice;

            try {
                // Call backend API to create a Stripe Checkout session
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-checkout-session`, {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items: [
                            {
                                name: title,
                                price: price! * 100, // Stripe expects price in cents
                                quantity: 1,
                            },
                        ],
                    }),
                });

                const session = await response.json();

                // Redirect to Stripe Checkout page
                const result = await stripe?.redirectToCheckout({
                    sessionId: session.id,
                });

                if (result?.error) {
                    console.error(result.error.message);
                }
            } catch (error) {
                console.error("Error creating Stripe session:", error);
            }
        }
    };

    return (
        <Card
            className={cn(`w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
                "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
                    exclusive,
            })}>
            <div>
                <CardHeader className="pb-8 pt-4">
                    {isYearly && yearlyPrice && monthlyPrice ? (
                        <div className="flex justify-between">
                            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
                            <div
                                className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white", {
                                    "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ": popular,
                                })}>
                                Save ${monthlyPrice * 12 - yearlyPrice}
                            </div>
                        </div>
                    ) : (
                        <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
                    )}
                    <div className="flex gap-0.5">
                        <h3 className="text-3xl font-bold">{yearlyPrice && isYearly ? "$" + yearlyPrice : monthlyPrice ? "$" + monthlyPrice : "Custom"}</h3>
                        <span className="flex flex-col justify-end text-sm mb-1">{yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}</span>
                    </div>
                    <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {features.map((feature: string) => (
                        <CheckItem key={feature} text={feature} />
                    ))}
                </CardContent>
            </div>
            <CardFooter className="mt-2">
                <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleButtonClick}>
                    <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
                    {actionLabel}
                </Button>
            </CardFooter>
        </Card>
    );
};

const CheckItem = ({ text }: { text: string }) => (
    <div className="flex gap-2">
        <CheckCircle2 size={18} className="my-auto text-green-400" />
        <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
    </div>
);

export default PricingCard;
