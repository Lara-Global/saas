/** @format */
"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStack from "@/components/TechStack";
// import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";
import { TextVelocity } from "@/components/text-velocity";
import {Testimonials} from "@/components/testimonials";
import { HeroImage } from "@/components/hero-image";

export default function Home() {
    return (
        <div className="container">
            <Navbar />

            <HeroSection />
            <HeroImage />


            <TechStack />

            <Testimonials />
            <br />
            <div className="overflow-hidden bg-colorful-animation">
                <TextVelocity>Join Us</TextVelocity>
            </div>
            <br />
            <Footer />
        </div>
    );
}