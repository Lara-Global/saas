/** @format */
"use client"; // Add this directive at the top

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BoxReveal from "@/components/ui/box-reveal";

const NotFound: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-center mx-auto my-10 p-5">
                {/* Image Container */}
                <div className="relative w-full md:w-[300px] h-[250px]">
                    <Image
                        src="/illustrations/errorpic.png"
                        alt="Page Not Found"
                        fill
                        style={{ objectFit: "contain" }}
                        role="img"
                        aria-label="Illustration showing a page not found"
                    />
                </div>
                {/* Text Container */}
                <div className="text-center md:text-left md:ml-5">
                    <BoxReveal boxColor={"#845EC2"} duration={0.5}>
                        <p className="text-[2.5rem] font-semibold">
                            404 Page Not Found <span className="text-[#845EC2]">.</span>
                        </p>
                    </BoxReveal>

                    <BoxReveal boxColor={"#845EC2"} duration={0.5}>
                        <h2 className="mt-[.5rem] text-[1rem]">
                            The page you are looking for could not be found.{" "}
                            <span className="text-[#845EC2]"></span>
                        </h2>
                    </BoxReveal>
                    <br />

                    <BoxReveal boxColor={"#845EC2"} duration={0.5}>
                        <Button
                            onClick={() => window.history.back()}
                            variant="outline"
                        >
                            Go Back
                        </Button>
                        
                    </BoxReveal>

                    
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;
