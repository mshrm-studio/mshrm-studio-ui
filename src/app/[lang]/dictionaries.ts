import 'server-only'

import { Locale } from '@/utils/enums/Locale'

export interface Dictionary {
    [key: string]: any
}

export const loadDictionary = (l: Locale, ns: string): Promise<Dictionary> =>
    import(`../../utils/dictionaries/${l}/${ns}.json`).then(
        (module) => module.default
    )

export const loadDictionaries = async (l: Locale, nsList: string[]) => {
    const dictionaries = await Promise.all(
        nsList.map(async (ns) => {
            const dict = await loadDictionary(l, ns)

            const normalisedNs = ns.replace('app/', '').replace('admin/', '')

            const formattedNs = normalisedNs.startsWith('pages/')
                ? normalisedNs.split('/')[1]
                : ns

            return { [formattedNs]: dict }
        })
    )

    return Object.assign({}, ...dictionaries)
}
