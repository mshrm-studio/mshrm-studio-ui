export enum ToolType {
    Application = 'Application',
    Technology = 'Technology',
}

export const toolTypes = Object.values(ToolType)

export function isToolType(value: unknown): value is ToolType {
    return typeof value === 'string' && (toolTypes as string[]).includes(value)
}
