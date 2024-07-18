import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const nonNormalisedBaseUrl = process.env.NEXT_PUBLIC_URL as string

    const baseUrl = nonNormalisedBaseUrl.endsWith('/')
        ? nonNormalisedBaseUrl.slice(0, -1)
        : nonNormalisedBaseUrl

    const nonNormalisedProductionUrl = process.env
        .NEXT_PUBLIC_PRODUCTION_URL as string

    const productionUrl = nonNormalisedProductionUrl.endsWith('/')
        ? nonNormalisedProductionUrl.slice(0, -1)
        : nonNormalisedProductionUrl

    return {
        rules: {
            userAgent: '*',
            allow: baseUrl === productionUrl ? '/' : '',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
