import 'server-only'

import { Locale } from '@/utils/enums/locale'

export interface Dictionary {
    [key: string]: any
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    ar: () =>
        import('../../utils/dictionaries/ar/ar.json').then(
            (module) => module.default
        ),
    de: () =>
        import('../../utils/dictionaries/de/de.json').then(
            (module) => module.default
        ),
    en: () =>
        import('../../utils/dictionaries/en/en.json').then(
            (module) => module.default
        ),
    es: () =>
        import('../../utils/dictionaries/es/es.json').then(
            (module) => module.default
        ),
    km: () =>
        import('../../utils/dictionaries/km/km.json').then(
            (module) => module.default
        ),
    zh: () =>
        import('../../utils/dictionaries/zh/zh.json').then(
            (module) => module.default
        ),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
