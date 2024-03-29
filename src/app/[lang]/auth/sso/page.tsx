import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Msal from '@/components/MsalV2'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await getDictionary(lang)

    return (
        <>
            <h1>{dict.signIn}</h1>

            <Msal />
        </>
    )
}
