import { motion } from 'framer-motion'
import { HeaderMainNavigationMenuItem } from '@/components/Header/MainNavigation/MenuItem'
import styles from '@/utils/styles/header/main-navigation/mainNavigation.module.css'

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
}

export const HeaderMainNavigation = () => (
    <motion.ul className={styles.ul} variants={variants}>
        {itemIds.map((i) => (
            <HeaderMainNavigationMenuItem i={i} key={i} />
        ))}
    </motion.ul>
)

const itemIds = [0, 1, 2, 3, 4]
