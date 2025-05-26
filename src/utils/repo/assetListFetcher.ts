import { isAssetListResponse } from '@/utils/dto/Asset'
import api from '@/utils/api'

export async function assetListFetcher(params?: string) {
    try {
        const endpoint = '/api/v1/assets'

        const data = await api(
            params ? `${endpoint}?${params.toString()}` : endpoint
        )

        if (!isAssetListResponse(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
}
