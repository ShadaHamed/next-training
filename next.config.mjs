/** @type {import('next').NextConfig} */
const nextConfig = {
    //if we want to use images from another server not local server
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'your-remote-server.com'
            }
        ]
    }
};

export default nextConfig;
