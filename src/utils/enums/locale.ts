export enum Locale {
    Chinese = 'zh',
    English = 'en',
    German = 'de',
    Spanish = 'es',
}

export const locales = Object.values(Locale)

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (locales as string[]).includes(value)
}
