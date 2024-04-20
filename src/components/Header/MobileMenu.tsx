'use client'

import { motion } from 'framer-motion'
import { HeaderMainNavigationToggle } from '@/components/Header/MainNavigation/Toggle'
import { HeaderMainNavigation } from '@/components/Header/MainNavigation/MainNavigation'
import React, { useContext, useRef, useState } from 'react'
import DimensionsContext from '@/utils/context/Dimensions'
import styles from '@/utils/styles/header/mobileMenu.module.css'

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(30px at 40px 40px)',
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
}

export default function HeaderMobileMenu() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const containerRef = useRef(null)
    const { dimensions } = useContext(DimensionsContext)

    return (
        <motion.nav
            className={styles.nav}
            aria-expanded={mobileMenuOpen}
            initial={false}
            animate={mobileMenuOpen ? 'open' : 'closed'}
            custom={dimensions.viewportHeight}
            ref={containerRef}
        >
            <motion.div className={styles.background} variants={sidebar} />

            <HeaderMainNavigation />

            <HeaderMainNavigationToggle
                open={mobileMenuOpen}
                toggle={(_e: React.MouseEvent<HTMLButtonElement>) =>
                    setMobileMenuOpen((prev) => !prev)
                }
            />
        </motion.nav>
    )
}
