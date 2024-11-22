import { isTool } from '@/utils/dto/Tool'
import api from '@/utils/api'

export async function toolFetcher(guid: string) {
    try {
        const data = await api(`/api/v1/tools/${guid}`)

        if (!isTool(data)) {
            throw new Error('Invalid response structure')
        }

        return data
    } catch (error) {
        throw error
    }
}
