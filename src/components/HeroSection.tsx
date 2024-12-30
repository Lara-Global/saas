
import Link from "next/link";


import { buttonVariants } from "@/components/ui/button";
import { Announcement } from "@/components/announcement";
import { cn } from "@/lib/utils";


export default function Hero() {
    return (
        <section
            id="hero"
            className="flex w-full flex-col items-center justify-center gap-4 text-center"
        >
            
            <header className="mt-10 flex flex-col items-center gap-4">
               {/*   <Announcement/> */} 

                <h1 className="bg-colorful-animation relative mt-6 text-center text-4xl font-bold leading-[3rem] tracking-tight max-md:text-balance sm:max-w-4xl sm:text-5xl sm:leading-[4rem] md:text-6xl md:leading-[4.5rem] lg:text-8xl">
                    Simplify Your Business with LARA
                </h1>
                <h2 className="max-w-xl text-lg text-muted-foreground duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2">
                    The Ultimate All-in-One Platform for Streamlined Product Management, Invoicing, and Ticket Sales, Tailored for Small Businesses.   {/*<ExternalLink href="https://nextjs.org/">
                        Next.js (App Router)
                    </ExternalLink>
                    ,{" "}
                    <ExternalLink href="https://www.typescriptlang.org/">
                        Typescipt
                    </ExternalLink>
                    ,{" "}
                    <ExternalLink href="https://tailwindcss.com/">
                        Tailwind CSS
                    </ExternalLink>
                    , <ExternalLink href="https://ui.shadcn.com/">shadcn/ui</ExternalLink>
                    ,{" "}
                    
                    & more! */}  
                </h2>
            </header>

            <div className="flex items-center gap-2 py-2 duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2">
                <Link
                    href="/auth/login"
                    className={cn(
                        buttonVariants({ size: "lg" }),
                        "font-semibold shadow-lg transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background rounded-3xl"
                    )}
                >
                    Get Started
                </Link>
                <a
                    href="/contact"
                    className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "animated-button rounded-3xl",
                    )}
                >
                    Get a Demo 
                </a> 
            </div>

          
        </section>
        
    );
}

type ExternalLinkProps = {
    href: string;
    children: React.ReactNode;
};

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline-offset-4 transition-colors hover:text-foreground hover:underline"
    >
        {children}
    </a>
);