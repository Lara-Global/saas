/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
