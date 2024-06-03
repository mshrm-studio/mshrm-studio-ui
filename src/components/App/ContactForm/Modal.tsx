import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ContactFormModalClient from '@/components/App/ContactForm/ModalClient'

export default async function ContactFormModal({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <ContactFormModalClient />
        </DictionaryContextProvider>
    )
}
