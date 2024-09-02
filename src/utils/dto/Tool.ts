import { ToolType } from '@/utils/enums/ToolType'

export default interface Tool {
    guidId: string
    link: string | null
    name: string
    rank: number
    toolType: ToolType
    description: string | null
    darkLogoGuidId: string
    darkLogoUrl: string
    lightLogoGuidId: string
    lightLogoUrl: string
}

export interface ToolResponse {
    data: Tool
}

export interface ToolListResponse {
    data: {
        results: Tool[]
    }
}

export function isTool(input: unknown): input is Tool {
    return (
        typeof input === 'object' &&
        input !== null &&
        'guidId' in input &&
        'name' in input
    )
}

export function isToolResponse(input: unknown): input is ToolResponse {
    return (
        typeof input === 'object' &&
        input !== null &&
        'data' in input &&
        isTool(input.data)
    )
}

export function isToolList(input: unknown): input is Tool[] {
    return Array.isArray(input) && input.every((item) => isTool(item))
}

export function isToolListResponse(input: unknown): input is ToolListResponse {
    return (
        typeof input === 'object' &&
        input !== null &&
        'data' in input &&
        typeof input.data === 'object' &&
        input.data !== null &&
        'results' in input.data &&
        isToolList(input.data.results)
    )
}
