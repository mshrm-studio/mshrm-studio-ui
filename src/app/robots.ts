import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            disallow:
                process.env.NEXT_PUBLIC_PRODUCTION_URL ===
                process.env.NEXT_PUBLIC_URL
                    ? undefined
                    : '/',
        },
        sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    }
}
