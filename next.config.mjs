/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mshrm.fra1.cdn.digitaloceanspaces.com',
            },
        ],
    },
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
}

export default nextConfig
