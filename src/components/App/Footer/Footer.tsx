import LanguageSwitcher from '@/components/App/Footer/LanguageSwitcher'
import styles from '@/styles/footer/footer.module.css'
import ContactUs from '@/components/App/Footer/ContactUs'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import AllRightsReserved from '@/components/App/Footer/AllRightsReserved'

export default async function Footer({ locale }: { locale: Locale }) {
    const dict = await loadDictionaries(locale, ['app/footer'])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <footer className={styles.footer}>
                <ContactUs />

                <LanguageSwitcher dict={dict} />

                <AllRightsReserved dict={dict} />
            </footer>
        </DictionaryContextProvider>
    )
}
