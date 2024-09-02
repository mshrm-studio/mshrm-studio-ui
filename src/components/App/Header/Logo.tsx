import BrandLogo from '@/components/Brand/Logo'
import Link from 'next/link'
import styles from '@/styles/header/brandLogo.module.css'

type Props = {}

const HeaderLogo: React.FC<Props> = ({}) => {
    return (
        <Link href="/">
            <BrandLogo
                className={styles.blackBrandLogo}
                color="black"
                priority
            />

            <BrandLogo
                className={styles.whiteBrandLogo}
                color="white"
                priority
            />
        </Link>
    )
}

export default HeaderLogo
