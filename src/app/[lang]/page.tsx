import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Hero from '@/components/HomePage/Hero'
import AboutUsMessage from '@/components/HomePage/AboutUsMessage'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dictionary = await getDictionary(lang)

    return (
        <div>
            <Hero dictionary={dictionary} />

            <AboutUsMessage dictionary={dictionary} />
        </div>
    )
}
