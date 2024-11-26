import { isUser } from '@/utils/dto/User'
import api from '@/utils/api'

export const profileFetcher = async () => {
    try {
        const data = await api('/api/v1/users/profile')

        if (!isUser(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
}
