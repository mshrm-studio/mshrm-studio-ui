import { isUser } from '@/utils/dto/User'
import api from '@/utils/api'

export async function userFetcher(guid: string) {
    try {
        const data = await api(`/api/v1/users/${guid}`)

        if (!isUser(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        console.log('userFetcher error', error)
        throw error
    }
}
