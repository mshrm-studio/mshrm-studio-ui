import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Context/DictionaryProvider'
import ContactFormModalClient from '@/components/ContactForm/ModalClient'

export default async function ContactFormModal({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <ContactFormModalClient />
        </DictionaryContextProvider>
    )
}
