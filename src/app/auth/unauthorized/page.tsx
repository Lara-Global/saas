/** @format */
"use client"; // Add this directive at the top

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const UnauthorizedPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
            <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold text-destructive">403 Forbidden</h1>
                <p className="text-lg text-muted-foreground">
                    You do not have permission to access this page.
                </p>
                <div className="relative w-[500px] h-[400px] mx-auto">
                    <Image
                        src="/illustrations/timed-out-error.svg"
                        alt="Forbidden Access"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <Button
                    variant="default"
                    size="lg"
                    onClick={() => window.history.back()}
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
