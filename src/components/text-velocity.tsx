"use client";

import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    wrap,
} from "framer-motion";
import * as React from "react";

interface TextVelocityProps {
    children: string;
    baseVelocity?: number;
}

export function TextVelocity({
    children,
    baseVelocity = 5,
}: TextVelocityProps) {
    const baseX = useMotionValue(0);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });

 
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = React.useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="relative m-0 flex flex-nowrap overflow-hidden whitespace-nowrap tracking-tight">
            <motion.div
                className="relative flex flex-nowrap whitespace-nowrap text-6xl font-semibold uppercase"
                style={{ x }}
            >
                {Array.from({ length: 8 }).map((_, index) => (
                    <span key={index} className="bg-colorful-animation2 mr-8 inline-flex items-center gap-8">
                        {children} <TextVelocitySeparator className="size-8" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

function TextVelocitySeparator({ ...props }: React.HTMLAttributes<SVGElement>) {
    return (
        <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8.75348 17.7011C7.72056 14.0765 3.94416 10.3143 0.305928 9.28524C-0.101976 9.15415 -0.101976 8.86576 0.305928 8.72812C3.95074 7.69252 7.72056 3.93686 8.76005 0.305723C8.8719 -0.0940951 9.14164 -0.0940951 9.25349 0.305723C10.2864 3.93686 14.0628 7.69252 17.6945 8.72812C18.1024 8.85921 18.1024 9.15415 17.6945 9.28524C14.0562 10.3143 10.2798 14.0765 9.24691 17.7011C9.13506 18.1075 8.86532 18.1075 8.75348 17.7011Z"
                fill="currentColor"
            ></path>
        </svg>
    );
}