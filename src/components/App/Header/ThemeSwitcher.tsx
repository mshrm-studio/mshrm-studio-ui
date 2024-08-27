'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import styles from '@/styles/themeSwitcher.module.css'
import { useTheme } from 'next-themes'

export default function HeaderThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <button
            className={styles.button}
            title={
                resolvedTheme === 'dark'
                    ? 'TODO (translate): Switch to light theme'
                    : 'TODO (translate): Switch to dark theme'
            }
            onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
        >
            {resolvedTheme === 'dark' ? (
                <SunIcon className={styles.icon} />
            ) : (
                <MoonIcon className={styles.icon} />
            )}
        </button>
    )
}
