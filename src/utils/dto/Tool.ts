import { ToolType } from '@/utils/enums/ToolType'
import ApiPaginatedResponse, {
    isApiPaginatedResponse,
} from '@/utils/dto/ApiPaginatedResponse'

export default interface Tool {
    guidId: string
    link: string | null
    name: string
    rank: number
    toolType: ToolType
    description: string | null
    logoGuidId: string
    logoUrl: string
}

export interface ToolListResponse
    extends Omit<ApiPaginatedResponse, 'results'> {
    results: Tool[]
}

export function isTool(input: unknown): input is Tool {
    return typeof input === 'object' && input !== null && 'name' in input
}

export function isToolList(input: unknown): input is Tool[] {
    return Array.isArray(input) && input.every((item) => isTool(item))
}

export function isToolListResponse(input: unknown): input is ToolListResponse {
    return isApiPaginatedResponse(input) && isToolList(input.results)
}
