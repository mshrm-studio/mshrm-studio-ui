import 'server-only'
import { cache } from 'react'
import { isUser } from '@/utils/dto/User'
import api from '@/utils/api'

export const userFetcher = cache(async (guid: string) => {
    try {
        const data = await api(`/api/v1/users/${guid}`)

        if (!isUser(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
})
