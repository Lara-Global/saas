"use client";

import React, { useState } from "react";
import PricingCard from "./PricingCard";
import PricingHeader from "./PricingHeader";
import PricingSwitch from "./PricingSwitch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export default function Page() {
    const [isYearly, setIsYearly] = useState(false);
    const togglePricingPeriod = (value: string) => setIsYearly(parseInt(value) === 1);

    const plans = [
        {
            title: "Pro",
            monthlyPrice: 1500, // In cents (Stripe works with smallest currency units)
            yearlyPrice: 15000, // In cents
            description: "Perfect for owners of small & medium businesses",
            features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
            actionLabel: "Get Started",
            popular: true,
        },
        {
            title: "Enterprise",
            price: "Custom",
            description: "Dedicated support and infrastructure to fit your needs",
            features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3", "Super Exclusive Feature"],
            actionLabel: "Contact Sales",
            exclusive: true,
        },
    ];

   
    return (
        <div>
            <Navbar />
            <PricingHeader title="Pricing Plans" subtitle="Choose the plan that's right for you" />
            <PricingSwitch onSwitch={togglePricingPeriod} />
            <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
                {plans.map((plan) => {
                    return (
                        <PricingCard
                            key={plan.title}
                            {...plan}
                            isYearly={isYearly}
                         
                        />
                    );
                })}
            </section>
            <br />
            <Footer />
        </div>
    );
}
