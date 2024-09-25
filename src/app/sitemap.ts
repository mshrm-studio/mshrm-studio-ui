import { locales } from '@/utils/enums/Locale'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const publicUrl = process.env.NEXT_PUBLIC_URL || 'https://www.mshrm.studio'

    return [
        {
            url: publicUrl,
            lastModified: new Date(),
            alternates: {
                languages: locales.reduce((acc, locale) => {
                    acc[locale] = `${publicUrl}/${locale}`
                    return acc
                }, {} as Record<string, string>),
            },
        },
        {
            url: `${publicUrl}/contact`,
            lastModified: new Date(),
            alternates: {
                languages: locales.reduce((acc, locale) => {
                    acc[locale] = `${publicUrl}/${locale}/contact`
                    return acc
                }, {} as Record<string, string>),
            },
        },
    ]
}
