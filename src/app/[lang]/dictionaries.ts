import 'server-only'

import { Locale } from '@/utils/enums/Locale'

export interface Dictionary {
    [key: string]: any
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    ar: () =>
        import('../../utils/dictionaries/ar.json').then(
            (module) => module.default
        ),
    de: () =>
        import('../../utils/dictionaries/de.json').then(
            (module) => module.default
        ),
    en: () =>
        import('../../utils/dictionaries/en.json').then(
            (module) => module.default
        ),
    es: () =>
        import('../../utils/dictionaries/es.json').then(
            (module) => module.default
        ),
    km: () =>
        import('../../utils/dictionaries/km.json').then(
            (module) => module.default
        ),
    zh: () =>
        import('../../utils/dictionaries/zh.json').then(
            (module) => module.default
        ),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export const loadDictionary = (l: Locale, ns: string): Promise<Dictionary> =>
    import(`../../utils/dictionaries/${l}/${ns}.json`).then(
        (module) => module.default
    )

export const loadDictionaries = async (l: Locale, nsList: string[]) => {
    const dictionaries = await Promise.all(
        nsList.map((ns) => loadDictionary(l, ns))
    )

    return Object.assign({}, ...dictionaries)
}
