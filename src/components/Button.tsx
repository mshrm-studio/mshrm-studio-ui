import React from 'react'
import styles from '@/utils/styles/button.module.css'

type Props = {
    children: React.ReactNode
    size?: 'base' | 'threexl' | 'fourxl'
}

export default function Button({ children, size = 'base' }: Props) {
    return <button className={`${styles.button} ${size}`}>{children}</button>
}
