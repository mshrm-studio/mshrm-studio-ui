'use client'

import styles from '@/app/[lang]/(app)/_styles/marketEntity.module.css'
import { motion } from 'framer-motion'
import React from 'react'

export default function MarketEntity({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className={styles.wrapper}
        >
            {children}
        </motion.div>
    )
}
