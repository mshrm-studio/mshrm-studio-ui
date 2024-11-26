import 'server-only'
import { cache } from 'react'
import { isTool } from '@/utils/dto/Tool'
import api from '@/utils/api'

export const toolFetcher = cache(async (guid: string) => {
    try {
        const data = await api(`/api/v1/tools/${guid}`)

        if (!isTool(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
})
