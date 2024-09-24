/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mshrm.fra1.cdn.digitaloceanspaces.com',
            },
            {
                protocol: 'https',
                hostname: 'mshrmstudiostorage.blob.core.windows.net',
            },
        ],
    },
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
}

export default nextConfig
