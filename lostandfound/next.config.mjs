/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination:
                    'https://apifoxmock.com/m1/4946855-4604544-default/:path*',
            },
        ];
    }
};


export default nextConfig;
