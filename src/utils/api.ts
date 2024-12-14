import getAccessToken from '@/utils/msal/AccessToken'

const api = async (endpoint: string, options?: RequestInit): Promise<any> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    const normalisedEndpoint = endpoint.startsWith('/')
        ? endpoint.slice(1)
        : endpoint

    const normalisedBaseUrl = baseUrl.endsWith('/')
        ? baseUrl.slice(0, -1)
        : baseUrl

    const url = endpoint.startsWith('http')
        ? endpoint
        : `${normalisedBaseUrl}/${normalisedEndpoint}`

    const isClient = typeof window !== 'undefined'
    const token = isClient ? await getAccessToken() : null

    const headers: any = {
        ...(options?.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    if (!(options?.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(url, {
        ...options,
        headers,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))

        throw error
    }

    return response.json().catch(() => ({}))
}

export default api
