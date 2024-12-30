import { siteConfig } from "@/config/site";

export const CLIENTS = [
    { alt: "client1", logo: "/placeholders/client-1.png" },
    { alt: "client2", logo: "/placeholders/client-2.png" },
    { alt: "client3", logo: "/placeholders/client-3.png" },
    { alt: "client4", logo: "/placeholders/client-4.png" },
    { alt: "client5", logo: "/placeholders/client-5.png" },
];

export const USERS = [
    {
        name: "Omar",
        message:
            "LARA has revolutionized our product management. Its intuitive interface and seamless invoicing features have significantly boosted our efficiency and organization.",
    },
    {
        name: "Moha",
        message:
            "Managing our inventory and sales has never been easier. LARA's comprehensive tools for tracking products and generating invoices have streamlined our operations.",
    },
    {
        name: "Zaid",
        message:
            "With LARA, our ticket sales and event management are now integrated into one platform. The real-time analytics and automated invoicing have elevated our business processes.",
    },
    {
        name: "Amina",
        message:
            "I was initially unsure, but LARA’s user-friendly design and robust features have far exceeded my expectations. Our team's productivity has soared, and our operations are more efficient.",
    },
    {
        name: "Fatima",
        message:
            "LARA simplifies invoicing and product management, allowing us to focus more on our business growth. The automated reports and secure data management are game-changers.",
    },
    {
        name: "Hassan",
        message:
            "Thanks to LARA, we've streamlined our product tracking and sales processes. The ability to manage everything from one platform has greatly enhanced our operational efficiency.",
    },
    {
        name: "Nadia",
        message:
            "LARA has been instrumental in organizing our sales and inventory. The detailed insights and easy-to-use invoicing system have transformed the way we handle business operations.",
    },
    {
        name: "Sara",
        message:
            "LARA's intuitive dashboard and real-time data have made managing our products and invoices a breeze. It's a crucial tool that has significantly improved our workflow.",
    },
    {
        name: "Mona",
        message:
            "The seamless integration of product management and ticket sales in LARA has streamlined our business operations. We now handle everything efficiently and effectively.",
    },
    {
        name: "Jasmine",
        message:
            "LARA's comprehensive features for invoicing and product tracking have made a huge difference for us. Our business processes are now more streamlined and effective.",
    },
    {
        name: "Khalid",
        message:
            "LARA is a powerful tool that has brought order and efficiency to our business. The ability to manage products, invoices, and sales all in one place has been incredibly beneficial.",
    },
    {
        name: "Caelean",
        message:
            "LARA has enhanced our business operations with its robust management tools and real-time analytics. Our productivity and operational efficiency have both improved.",
    },
    {
        name: "Sara",
        message:
            "LARA’s all-in-one platform for managing products and generating invoices has made a significant impact on our business. We’re more organized and productive than ever.",
    },
    {
        name: "Dalia",
        message:
            "The ease of use and comprehensive features of LARA have transformed our business management. From invoicing to inventory, everything is now more streamlined and efficient.",
    },
    {
        name: "Ibrahim",
        message:
            "With LARA, we’ve seen remarkable improvements in our business processes. The ability to manage sales, products, and invoices from a single platform is invaluable.",
    },
    {
        name: "Ali",
        message:
            "LARA has significantly improved our operational efficiency. The integrated invoicing and product management features have made running our business much smoother.",
    },
    {
        name: "Junior",
        message:
            "LARA’s powerful tools for managing products, invoicing, and sales have greatly enhanced our business operations. We’re seeing faster processing and better organization.",
    },
    {
        name: "Rami",
        message:
            "Thanks to LARA, our business processes are now much more efficient. The platform’s features for invoicing and product management have streamlined our operations significantly.",
    },
    {
        name: "Bob",
        message:
            "LARA has been a game-changer for us. Its comprehensive management tools and easy-to-use interface have drastically improved our productivity and business operations.",
    },
];

export const PRICING_CARDS = [
    {
        planType: "Free Plan",
        price: "0",
        description: "Limited block trials for teams",
        highlightFeature: "",
        features: [
            "Unlimited blocks for teams",
            "Unlimited file uploads",
            "30 day page history",
            "Invite 2 guests",
        ],
    },
    {
        planType: "Pro Plan",
        price: "499",
        description: "Billed annually. ₹555 billed monthly",
        highlightFeature: "Everything in free +",
        features: [
            "Unlimited blocks for teams",
            "Unlimited file uploads",
            "1 year page history",
            "Invite 10 guests",
        ],
    },
];

export const PRICING_PLANS = { proplan: "Pro Plan", freeplan: "Free Plan" };

export const MAX_FOLDERS_FREE_PLAN = 3;

export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const LEGAL = {
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
                description: `- **Personal Information:** We do not collect any personal information from ${siteConfig.name} users. ${siteConfig.name} is designed to respect your privacy, and any data you enter or generate while using the application remains on your local device.`,
            },
            {
                title: "How We Use Your Information",
                description: `- **Usage Data:** ${siteConfig.name} does not collect any usage data. All data generated or processed within the application stays locally on your device.`,
            },
            {
                title: "Cookies and Tracking Technologies",
                description: `- **Cookies:** ${siteConfig.name} does not use cookies or any tracking technologies.`,
            },
            {
                title: "Data Security",
                description: `- **Data Storage:** As an open-source project, ${siteConfig.name} does not store any user data on external servers. All data remains on the user's local device.`,
            },
            {
                title: "Third-Party Links",
                description: `- **External Links:** ${siteConfig.name} may contain links to external websites or resources. This Privacy Policy applies only to ${siteConfig.name} and does not cover the privacy practices of third-party websites.`,
            },
            {
                title: "Changes to Privacy Policy",
                description: `- **Updates:** This Privacy Policy may be updated from time to time. It is your responsibility to review this policy periodically. Your continued use of ${siteConfig.name} after changes to this policy signifies your acceptance of the updated terms.`,
            },
            {
                title: "Contact Information",
                description: `If you have any questions or concerns about this Privacy Policy, please contact us at ${siteConfig.author.email}.`,
            },
        ],
    },
};
