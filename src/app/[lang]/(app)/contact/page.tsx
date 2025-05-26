import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import ContactForm from '@/app/[lang]/(app)/contact/_components/Form'
import type { Metadata } from 'next'

type Props = Readonly<{
    params: { lang: Locale }
}>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const dict = await loadDictionaries(params.lang, ['app/pages/contact'])

    return {
        alternates: {
            canonical: '/contact',
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}/contact`
                return acc
            }, {} as Record<string, string>),
        },
        description: dict.contact.metadata.description,
        openGraph: {
            description: dict.contact.metadata.description,
            title: dict.contact.metadata.title,
        },
        title: dict.contact.metadata.title,
        twitter: {
            description: dict.contact.metadata.description,
            title: dict.contact.metadata.title,
        },
    }
}

export default async function Page({ params }: Props) {
    const dict = await loadDictionaries(params.lang, [
        'app/pages/contact',
        'common',
        'form',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div
                id="contact-page"
                className="px-6 pt-12 md:pt-24 xl:max-w-site xl:mx-auto"
            >
                <div className="mb-8">
                    <a
                        href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                        className="uppercase font-extrabold text-xl"
                    >
                        {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                    </a>
                </div>

                <ContactForm />
            </div>
        </DictionaryContextProvider>
    )
}
