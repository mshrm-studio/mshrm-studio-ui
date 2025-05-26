import BrandLogo from '@/app/[lang]/_components/Brand/Logo'
import styles from '@/app/[lang]/(app)/_styles/header/brandLogo.module.css'
import { Dictionary } from '@/app/[lang]/dictionaries'
import LocaleLink from '@/app/[lang]/_components/LocaleLink'

type Props = {
    dict: Dictionary
}

const HeaderLogo: React.FC<Props> = ({ dict }) => {
    return (
        <LocaleLink href="/">
            <BrandLogo
                className={styles.blackBrandLogo}
                color="black"
                dict={dict}
                priority
            />

            <BrandLogo
                className={styles.whiteBrandLogo}
                color="white"
                dict={dict}
                priority
            />
        </LocaleLink>
    )
}

export default HeaderLogo
