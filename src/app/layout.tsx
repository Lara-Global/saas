import './globals.css';
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider
import { Analytics } from "@vercel/analytics/react"
export const metadata = {
    title: 'Lara',
    description: 'The Black Perl',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {/* Wrap children with ThemeProvider */}
                <ThemeProvider attribute="class" defaultTheme="system">
                  
                    {children}
                    <Analytics/>
                </ThemeProvider>
            </body>
        </html>
    );
}
