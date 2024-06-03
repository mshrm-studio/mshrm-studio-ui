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
