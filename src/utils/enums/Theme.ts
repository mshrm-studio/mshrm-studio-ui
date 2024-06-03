export enum Theme {
    Dark = 'dark',
    Light = 'light',
    System = 'system',
}

export const themes = Object.values(Theme)

export function isTheme(value: unknown): value is Theme {
    return typeof value === 'string' && (themes as string[]).includes(value)
}
