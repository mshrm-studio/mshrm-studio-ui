'use client'

import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/solid'
import styles from '@/utils/styles/themeSwitcher.module.css'
import { useTheme } from 'next-themes'

export default function HeaderThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    return (
        <div className={styles.options}>
            <button
                className={
                    theme === 'dark'
                        ? `${styles.button} ${styles.selected}`
                        : styles.button
                }
                title="Dark Theme"
                onClick={() => setTheme('dark')}
            >
                <MoonIcon className={styles.icon} />
            </button>

            <button
                className={
                    theme === 'system'
                        ? `${styles.button} ${styles.selected}`
                        : styles.button
                }
                title="System Theme"
                onClick={() => setTheme('system')}
            >
                <ComputerDesktopIcon className={styles.icon} />
            </button>

            <button
                className={
                    theme === 'light'
                        ? `${styles.button} ${styles.selected}`
                        : styles.button
                }
                title="Light Theme"
                onClick={() => setTheme('light')}
            >
                <SunIcon className={styles.icon} />
            </button>
        </div>
    )
}
