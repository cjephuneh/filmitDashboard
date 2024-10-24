/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    images: {
        domains: ['images.unsplash.com'],  // Correctly define the domain
    },
    async redirects() {
        return [
        {
            source: '/home',
            destination: '/',
            permanent: true,
        },
        ];
    },
};

export default nextConfig;
