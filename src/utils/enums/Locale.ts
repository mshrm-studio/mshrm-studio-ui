export enum Locale {
    Arabic = 'ar',
    Chinese = 'zh',
    English = 'en',
    German = 'de',
    Japanese = 'ja',
    Khmer = 'km',
    Spanish = 'es',
    Swahili = 'sw',
}

export const locales = Object.values(Locale)

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (locales as string[]).includes(value)
}
