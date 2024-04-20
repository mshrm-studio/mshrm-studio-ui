import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'

export default async function NotFound() {
    const enDictionary = await getDictionary(Locale.English)
    const zhDictionary = await getDictionary(Locale.Chinese)

    return (
        <main>
            <p>404</p>
            <p>{enDictionary.notFoundPage.heading}</p>
            <p>{zhDictionary.notFoundPage.heading}</p>
        </main>
    )
}
