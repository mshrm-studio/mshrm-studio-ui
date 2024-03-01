import 'server-only'

import { Locale } from '@/utils/enums/locale'

interface Dictionary {
    [key: string]: any
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
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
    zh: () =>
        import('../../utils/dictionaries/zh/zh.json').then(
            (module) => module.default
        ),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
