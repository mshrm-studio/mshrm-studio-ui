import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await getDictionary(lang)

    return (
        <div>
            <h1 className="text-4xl">{dict.welcome}</h1>
        </div>
    )
}
