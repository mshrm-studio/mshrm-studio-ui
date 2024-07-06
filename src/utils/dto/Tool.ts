import { ToolType } from '@/utils/enums/ToolType'

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

export function isTool(input: unknown): input is Tool {
    return (
        typeof input === 'object' &&
        input !== null &&
        'guidId' in input &&
        'name' in input
    )
}

export function isToolList(input: unknown): input is Tool[] {
    return Array.isArray(input) && input.every((item) => isTool(item))
}
