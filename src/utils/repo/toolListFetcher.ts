import { isToolListResponse } from '@/utils/dto/Tool'
import api from '@/utils/api'

export async function toolListFetcher(params?: URLSearchParams) {
    const endpoint = `/api/v1/tools`

    try {
        const data = await api(
            params ? `${endpoint}?${params.toString()}` : endpoint
        )

        if (!isToolListResponse(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
}
