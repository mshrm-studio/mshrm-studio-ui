import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ContactFormModalClient from '@/components/App/ContactForm/ModalClient'

export default async function ContactFormModal({ locale }: { locale: Locale }) {
    const dict = await loadDictionaries(locale, ['contactForm'])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <ContactFormModalClient />
        </DictionaryContextProvider>
    )
}
