import { isPriceListResponse } from '@/utils/dto/Price'
import api from '@/utils/api'

export async function priceListFetcher(params?: string) {
    const endpoint = `/api/v1/prices`

    try {
        const data = await api(
            params
                ? `${endpoint}?${params.toString()}`
                : `${endpoint}?baseAsset=USD`
        )

        if (!isPriceListResponse(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
}
