import { siteConfig } from "@/config/site";

// ============================================================================
// TYPES
// ============================================================================

export interface Client {
    alt: string;
    logo: string;
}

export interface UserTestimonial {
    name: string;
    message: string;
    role?: string;
    company?: string;
}

export interface PricingCard {
    planType: string;
    price: string;
    description: string;
    highlightFeature: string;
    features: string[];
    popular?: boolean;
}

export interface LegalSection {
    title: string;
    description: string;
}

export interface LegalContent {
    lastUpdated: string;
    sections: LegalSection[];
}

// ============================================================================
// CLIENTS
// ============================================================================

export const CLIENTS: Client[] = [
    { alt: "Client 1", logo: "/placeholders/client-1.png" },
    { alt: "Client 2", logo: "/placeholders/client-2.png" },
    { alt: "Client 3", logo: "/placeholders/client-3.png" },
    { alt: "Client 4", logo: "/placeholders/client-4.png" },
    { alt: "Client 5", logo: "/placeholders/client-5.png" },
];

// ============================================================================
// USER TESTIMONIALS
// ============================================================================

export const USERS: UserTestimonial[] = [
    {
        name: "Omar Benali",
        message:
            "LARA has revolutionized our product management. Its intuitive interface and seamless invoicing features have significantly boosted our efficiency and organization.",
        role: "Operations Manager",
    },
    {
        name: "Moha Idrissi",
        message:
            "Managing our inventory and sales has never been easier. LARA's comprehensive tools for tracking products and generating invoices have streamlined our operations.",
        role: "Sales Director",
    },
    {
        name: "Zaid Alami",
        message:
            "With LARA, our ticket sales and event management are now integrated into one platform. The real-time analytics and automated invoicing have elevated our business processes.",
        role: "Event Coordinator",
    },
    {
        name: "Amina Zahiri",
        message:
            "I was initially skeptical, but LARA's user-friendly design and robust features have far exceeded my expectations. Our team's productivity has soared.",
        role: "Business Owner",
    },
    {
        name: "Fatima El Fassi",
        message:
            "LARA simplifies invoicing and product management, allowing us to focus more on growth. The automated reports and secure data management are game-changers.",
        role: "Finance Manager",
    },
    {
        name: "Hassan Chakir",
        message:
            "Thanks to LARA, we've streamlined our product tracking and sales processes. Managing everything from one platform has greatly enhanced our efficiency.",
        role: "Retail Manager",
    },
    {
        name: "Nadia Berrada",
        message:
            "LARA has been instrumental in organizing our sales and inventory. The detailed insights and easy-to-use invoicing system have transformed our operations.",
        role: "Inventory Specialist",
    },
    {
        name: "Sara Tazi",
        message:
            "LARA's intuitive dashboard and real-time data have made managing our products and invoices a breeze. It's a crucial tool that has significantly improved our workflow.",
        role: "Store Manager",
    },
    {
        name: "Mona Lahlou",
        message:
            "The seamless integration of product management and ticket sales in LARA has streamlined our business operations. We now handle everything efficiently.",
        role: "Operations Lead",
    },
    {
        name: "Yasmine Benjelloun",
        message:
            "LARA's comprehensive features for invoicing and product tracking have made a huge difference. Our business processes are now more streamlined and effective.",
        role: "Business Analyst",
    },
    {
        name: "Khalid Mansouri",
        message:
            "LARA is a powerful tool that has brought order and efficiency to our business. Managing products, invoices, and sales all in one place has been incredibly beneficial.",
        role: "General Manager",
    },
    {
        name: "Karim Sebti",
        message:
            "LARA has enhanced our business operations with its robust management tools and real-time analytics. Our productivity and operational efficiency have both improved.",
        role: "Tech Lead",
    },
    {
        name: "Salma Oudghiri",
        message:
            "LARA's all-in-one platform for managing products and generating invoices has made a significant impact on our business. We're more organized than ever.",
        role: "Product Manager",
    },
    {
        name: "Dalia Hamdi",
        message:
            "The ease of use and comprehensive features of LARA have transformed our business management. From invoicing to inventory, everything is now more efficient.",
        role: "COO",
    },
    {
        name: "Ibrahim Kabbaj",
        message:
            "With LARA, we've seen remarkable improvements in our business processes. Managing sales, products, and invoices from a single platform is invaluable.",
        role: "Business Development",
    },
    {
        name: "Ali Naciri",
        message:
            "LARA has significantly improved our operational efficiency. The integrated invoicing and product management features have made running our business much smoother.",
        role: "Owner",
    },
    {
        name: "Younes Meziane",
        message:
            "LARA's powerful tools for managing products, invoicing, and sales have greatly enhanced our business operations. We're seeing faster processing and better organization.",
        role: "Operations Coordinator",
    },
    {
        name: "Rami Ziani",
        message:
            "Thanks to LARA, our business processes are now much more efficient. The platform's features for invoicing and product management have streamlined our operations significantly.",
        role: "Account Manager",
    },
    {
        name: "Mehdi Saadi",
        message:
            "LARA has been a game-changer for us. Its comprehensive management tools and easy-to-use interface have drastically improved our productivity and business operations.",
        role: "CEO",
    },
];

// ============================================================================
// PRICING
// ============================================================================

export const PRICING_CARDS: PricingCard[] = [
    {
        planType: "Free Plan",
        price: "0",
        description: "Perfect for getting started",
        highlightFeature: "",
        features: [
            "Up to 3 workspaces",
            "Basic invoicing features",
            "5 products per workspace",
            "30-day history",
            "Email support",
        ],
    },
    {
        planType: "Pro Plan",
        price: "499",
        description: "Billed annually. MAD 555 billed monthly",
        highlightFeature: "Everything in Free +",
        popular: true,
        features: [
            "Unlimited workspaces",
            "Advanced invoicing & reporting",
            "Unlimited products",
            "1-year history & exports",
            "Priority support",
            "Custom branding",
            "API access",
        ],
    },
];

export const PRICING_PLANS = {
    proplan: "Pro Plan",
    freeplan: "Free Plan",
} as const;

// ============================================================================
// LIMITS & CONSTRAINTS
// ============================================================================

export const MAX_FOLDERS_FREE_PLAN = 3;
export const MAX_PRODUCTS_FREE_PLAN = 5;
export const MAX_INVOICES_FREE_PLAN = 20;
export const HISTORY_DAYS_FREE_PLAN = 30;
export const HISTORY_DAYS_PRO_PLAN = 365;

// ============================================================================
// FILE UPLOADS
// ============================================================================

export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILES_PER_UPLOAD = 10;

// ============================================================================
// LEGAL CONTENT
// ============================================================================

export const LEGAL: {
    termsOfService: LegalContent;
    privacyPolicy: LegalContent;
} = {
    termsOfService: {
        lastUpdated: "December 15, 2023",
        sections: [
            {
                title: "Acceptance of Terms",
                description: `By using ${siteConfig.name}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you are using ${siteConfig.name} on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these terms.`,
            },
            {
                title: "License",
                description: `${siteConfig.name} is an open-source project distributed under the MIT License. You are free to use, modify, and distribute ${siteConfig.name}'s source code in accordance with the terms specified in the MIT License. A copy of the MIT License is included in the ${siteConfig.name} repository.`,
            },
            {
                title: "Code of Conduct",
                description: `When using ${siteConfig.name}, you agree to abide by our Code of Conduct, available in the project repository. The Code of Conduct outlines the expected behavior within the ${siteConfig.name} community and helps create a positive and inclusive environment for all contributors.`,
            },
            {
                title: "No Warranty",
                description: `${siteConfig.name} is provided "as is" without warranty of any kind, express or implied. The developers of ${siteConfig.name} make no guarantees regarding its functionality, security, or fitness for a particular purpose. You use ${siteConfig.name} at your own risk.`,
            },
            {
                title: "Limitation of Liability",
                description: `In no event shall the developers of ${siteConfig.name} be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of ${siteConfig.name}.`,
            },
            {
                title: "Contributions",
                description: `Contributions to ${siteConfig.name} are welcome, and by submitting a pull request or contributing in any other way, you agree to license your contribution under the terms of the MIT License.`,
            },
            {
                title: "Termination",
                description: `The developers of ${siteConfig.name} reserve the right to terminate or suspend access to ${siteConfig.name} at any time, with or without cause and with or without notice.`,
            },
            {
                title: "Changes to Terms",
                description: `These Terms of Service may be updated from time to time. It is your responsibility to review these terms periodically. Your continued use of ${siteConfig.name} after changes to these terms signifies your acceptance of the updated terms.`,
            },
            {
                title: "Contact Information",
                description: `If you have any questions or concerns about these Terms of Service, please contact us at ${siteConfig.author.email}.`,
            },
        ],
    },

    privacyPolicy: {
        lastUpdated: "December 15, 2023",
        sections: [
            {
                title: "Introduction",
                description: `Thank you for choosing ${siteConfig.name}, an open-source web application developed under the MIT License. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use ${siteConfig.name}. By using ${siteConfig.name}, you consent to the practices described in this Privacy Policy.`,
            },
            {
                title: "Information We Collect",
                description: `**Personal Information:** We do not collect any personal information from ${siteConfig.name} users. ${siteConfig.name} is designed to respect your privacy, and any data you enter or generate while using the application remains on your local device.`,
            },
            {
                title: "How We Use Your Information",
                description: `**Usage Data:** ${siteConfig.name} does not collect any usage data. All data generated or processed within the application stays locally on your device.`,
            },
            {
                title: "Cookies and Tracking Technologies",
                description: `**Cookies:** ${siteConfig.name} does not use cookies or any tracking technologies.`,
            },
            {
                title: "Data Security",
                description: `**Data Storage:** As an open-source project, ${siteConfig.name} does not store any user data on external servers. All data remains on the user's local device.`,
            },
            {
                title: "Third-Party Links",
                description: `**External Links:** ${siteConfig.name} may contain links to external websites or resources. This Privacy Policy applies only to ${siteConfig.name} and does not cover the privacy practices of third-party websites.`,
            },
            {
                title: "Changes to Privacy Policy",
                description: `**Updates:** This Privacy Policy may be updated from time to time. It is your responsibility to review this policy periodically. Your continued use of ${siteConfig.name} after changes to this policy signifies your acceptance of the updated terms.`,
            },
            {
                title: "Contact Information",
                description: `If you have any questions or concerns about this Privacy Policy, please contact us at ${siteConfig.author.email}.`,
            },
        ],
    },
};
