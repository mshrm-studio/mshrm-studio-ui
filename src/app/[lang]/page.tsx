import { Locale } from '@/utils/enums/locale'
import Link from 'next/link'
import { getDictionary } from '@/app/[lang]/dictionaries'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await getDictionary(lang)

    return (
        <>
            <h1>{dict.welcome}</h1>

            <Link href="/auth/sign-in">{dict.signIn}</Link>
        </>
    )
}
