"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { loadStripe } from "@stripe/stripe-js";

import { createCheckoutSession } from "@/components/api/stripe-pro";
import { motion } from 'framer-motion';
import GridPattern from "@/components/ui/grid-pattern";

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
    translations: {
        save: string;
        custom: string;
        perYear: string;
        perMonth: string;
        contactSales: string;
        free: string;
    };
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
    translations
}: PricingCardProps) => {
    const router = useRouter();

    const handleUpgrade = async () => {
        try {
            // Check if userId exists in localStorage
            const userId = localStorage.getItem("userId");

            if (!userId) {
                // Redirect to signup page if not authenticated
                router.push("/auth/sign-up");
                return;
            }

            const stripe = await stripePromise;

            // Determine price based on subscription type
            const price = isYearly ? yearlyPrice : monthlyPrice;

            if (!price) {
                console.error("Price is required.");
                return;
            }

            const items = [
                {
                    name: title,
                    description: description,
                    price: price * 100,
                    quantity: 1,
                },
            ];

            const session = await createCheckoutSession(userId, items);

            // Redirect to Stripe Checkout page
            const result = await stripe?.redirectToCheckout({
                sessionId: session.id,
            });

            if (result?.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error("Error during the upgrade process:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-md mx-auto"
        >
            {exclusive && (
                <div className="absolute inset-0 z-0">
                    <GridPattern />
                </div>
            )}
            <Card
                className={cn(`relative z-10 flex flex-col justify-between py-8 px-6 border rounded-xl shadow-md`, {
                    "border-blue-200": popular,
                    "border-blue-600": !popular,
                    "dark:bg-gray-900": exclusive,
                })}
            >
                <div>
                    <CardHeader className="pb-8">
                        {/* Title and Discount Badge */}
                        {isYearly && yearlyPrice && monthlyPrice ? (
                            <div className="flex justify-between items-center text-blue-500 dark:text-blue-400">
                                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                                <div
                                    className={cn("px-4 py-1 rounded-full text-sm font-semibold")}
                                >
                                    {translations.save} ${monthlyPrice * 12 - yearlyPrice}
                                </div>
                            </div>
                        ) : (
                            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                        )}

                        {/* Price Display */}
                        <div className="flex items-end mt-4">
                            <h3 className="text-5xl font-extrabold ">
                                {yearlyPrice && isYearly ? "$" + yearlyPrice : monthlyPrice ? "$" + monthlyPrice : translations.custom}
                            </h3>
                            <span className="text-lg ml-1">{yearlyPrice && isYearly ? translations.perYear : monthlyPrice ? translations.perMonth : null}</span>
                        </div>

                        <CardDescription className="pt-4 ">{description}</CardDescription>
                    </CardHeader>

                    {/* Features List */}
                    <CardContent className="flex flex-col gap-4">
                        {features.map((feature) => (
                            <CheckItem key={feature} text={feature} />
                        ))}
                    </CardContent>
                </div>

                {/* Action Button */}
                <CardFooter className="mt-8">
                    <Button
                        variant="outline"
                        className={cn(
                            "h-8 rounded-full px-5 font-semibold transition-all duration-200 hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-background sm:inline-flex center"
                        )}
                        onClick={handleUpgrade}
                    >
                        {actionLabel}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

const CheckItem = ({ text }: { text: string }) => (
    <div className="flex gap-2">
        <CheckCircle2 size={18} className="my-auto text-green-400" />
        <p className="pt-0.5 text-sm">{text}</p>
    </div>
);

export default PricingCard;
