import LanguageSwitcher from '@/app/[lang]/(app)/_components/Footer/LanguageSwitcher'
import styles from '@/app/[lang]/(app)/_styles/footer/footer.module.css'
import ContactUs from '@/app/[lang]/(app)/_components/Footer/ContactUs'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import AllRightsReserved from '@/app/[lang]/(app)/_components/Footer/AllRightsReserved'

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
