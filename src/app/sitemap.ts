import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const publicUrl = process.env.NEXT_PUBLIC_URL || 'https://mshrm.studio'

    return [
        {
            url: publicUrl,
            lastModified: new Date(),
            alternates: {
                languages: {
                    ar: `${publicUrl}/ar`,
                    de: `${publicUrl}/de`,
                    en: `${publicUrl}/en`,
                    es: `${publicUrl}/es`,
                    km: `${publicUrl}/km`,
                    zh: `${publicUrl}/zh`,
                },
            },
        },
    ]
}
