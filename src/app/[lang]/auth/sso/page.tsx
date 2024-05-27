import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Msal from '@/components/Msal'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await getDictionary(lang)

    return (
        <>
            <h1>{dict.action.signIn}</h1>

            <Msal />
        </>
    )
}
