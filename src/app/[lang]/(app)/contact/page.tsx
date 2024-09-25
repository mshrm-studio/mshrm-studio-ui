import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ContactForm from '@/components/App/ContactPage/Form'

type Props = Readonly<{
    params: { lang: Locale }
}>

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
