import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ContactForm from '@/components/App/ContactPage/Form'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, ['app/pages/contact', 'common'])

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
