// PricingSwitch.tsx
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PricingSwitchProps = {
    onSwitch: (value: string) => void;
};

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
    <Tabs defaultValue="0" className="w-40 mx-auto" onValueChange={onSwitch}>
        <TabsList className="py-6 px-2">
            <TabsTrigger value="0" className="text-base">
                Monthly
            </TabsTrigger>
            <TabsTrigger value="1" className="text-base">
                Yearly
            </TabsTrigger>
        </TabsList>
    </Tabs>
);

export default PricingSwitch;
