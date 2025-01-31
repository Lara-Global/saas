
// pages/api/stripe-pro.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16', // Use the latest Stripe API version
});

type Item = {
    name: string;
    description: string;
    price: number; // Price in cents
    quantity: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { userId, items } = req.body as { userId: string; items: Item[] };

        // Validate the input
        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description,
                    },
                    unit_amount: item.price, // Price in cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
            metadata: {
                userId, // Store the user ID in the session metadata
            },
        });

        // Return the session ID to the frontend
        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
