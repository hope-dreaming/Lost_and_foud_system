/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination:
                    // 'http://apifoxmock.com/m1/4946855-4604544-default/:path*',
                    'http://localhost:3005/api/:path*'
            },
        ];
    }
};


export default nextConfig;
