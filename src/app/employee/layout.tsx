/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeToggleGroup } from "@/components/theme-toggle-group";
import { cn } from "../../lib/utils";
import SideNavbar from "@/components/SideNavbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Hello chef"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full flex", // Adjusted for dark mode
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
        {/* Sidebar */}
        <SideNavbar />

        {/* Main page */}
        <div className="p-8 w-full">
        {children}

          <div className="mt-8 flex items-center justify-between lg:mt-12">
            <p className="mt-4 text-muted-foreground dark:text-gray-400"> {/* Adjusted for dark mode */}
              {/* Your text goes here */}
            </p>
            <ThemeToggleGroup />
          </div>
        </div>
      </body>
    </html>
  );
}
