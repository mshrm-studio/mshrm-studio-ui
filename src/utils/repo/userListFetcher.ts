import { isUserListResponse } from '@/utils/dto/User'
import api from '@/utils/api'

export async function userListFetcher(params?: string) {
    const endpoint = `/api/v1/users`

    try {
        const data = await api(
            params ? `${endpoint}?${params.toString()}` : endpoint
        )

        console.log('userListFetcher data:', data)
        console.log('isUserListResponse(data):', isUserListResponse(data))

        if (!isUserListResponse(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
}
