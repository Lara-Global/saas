"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function HeroImage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0.5, 1], [0, -50]);

  return (
    <div ref={ref} className="relative pb-10 pt-16">
      <div className="relative mx-auto flex flex-col items-center">
        <div className="w-full max-w-screen-xl [perspective:800px]">
          <motion.div style={{ rotateX }}>
            {/* Wrap the component in an anchor tag */}
            <a href="/pdf/lara.pdf" target="_blank" rel="noopener noreferrer">
              <AspectRatio ratio={1600 / 960}>
                <Image
                  src="/illustrations/hero-image.png"
                  alt="Hero Image"
                  className="rounded-xl object-cover"
                  priority
                  fill
                />
              </AspectRatio>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
