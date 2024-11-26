import 'server-only'
import { cache } from 'react'
import { isAsset } from '@/utils/dto/Asset'
import api from '@/utils/api'

export const assetFetcher = cache(async (guid: string) => {
    try {
        const data = await api(`/api/v1/assets/${guid}`)

        if (!isAsset(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
})
