import { MetadataRoute } from 'next'
import { locales } from '@/utils/enums/Locale'
import axios from 'axios'
import { isToolList } from '@/utils/dto/Tool'

const nonNormalisedApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string

const apiBaseUrl = nonNormalisedApiBaseUrl.endsWith('/')
    ? nonNormalisedApiBaseUrl.slice(0, -1)
    : nonNormalisedApiBaseUrl

async function fetchTools() {
    const response = await axios.get(`${apiBaseUrl}/aggregator/api/v1/tools`)
    const results = response?.data?.results
    const data = isToolList(results) ? results : []
    return data
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const nonNormalisedBaseUrl = process.env.NEXT_PUBLIC_URL as string

    const baseUrl = nonNormalisedBaseUrl.endsWith('/')
        ? nonNormalisedBaseUrl.slice(0, -1)
        : nonNormalisedBaseUrl

    const nonNormalisedSitemap = [
        { path: '/', priority: 1 },
        { path: '/admin/tools', priority: 0.5 },
        { path: '/admin/tools/create', priority: 0.5 },
    ]

    type Sitemap = {
        path: string
        priority: number
        lastModified?: Date
    }[]

    const sitemap: Sitemap = nonNormalisedSitemap.map((item) => ({
        path: item.path.startsWith('/') ? item.path : `/${item.path}`,
        priority: item.priority,
    }))

    // Fetch tools data
    const tools = await fetchTools()

    // Add show and edit pages for each tool
    tools.forEach((tool) => {
        const base = `/admin/tools/${tool.guidId}`
        sitemap.push({ path: base, priority: 0.5 })
        sitemap.push({ path: `${base}/edit`, priority: 0.5 })
    })

    return sitemap.map((item) => ({
        url: item.path === '/' ? baseUrl : baseUrl + item.path,
        lastModified: item.lastModified ? item.lastModified : new Date(),
        alternates: {
            languages: locales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]:
                        item.path === '/'
                            ? `${baseUrl}/${locale}`
                            : `${baseUrl}/${locale}` + item.path,
                }),
                {}
            ),
        },
    }))
}
