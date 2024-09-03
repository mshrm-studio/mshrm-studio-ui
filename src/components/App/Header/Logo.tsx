import BrandLogo from '@/components/Brand/Logo'
import Link from 'next/link'
import styles from '@/styles/header/brandLogo.module.css'
import { Dictionary } from '@/app/[lang]/dictionaries'

type Props = {
    dict: Dictionary
}

const HeaderLogo: React.FC<Props> = ({ dict }) => {
    return (
        <Link href="/">
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
        </Link>
    )
}

export default HeaderLogo
