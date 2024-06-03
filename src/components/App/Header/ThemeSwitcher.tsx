'use client'

import { useContext } from 'react'
import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/solid'
import styles from '@/utils/styles/themeSwitcher.module.css'
import ThemeContext from '@/utils/context/Theme'
import { Theme } from '@/utils/enums/Theme'

export default function HeaderThemeSwitcher() {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div className={styles.options}>
            <button
                className={
                    theme === Theme.Dark
                        ? `${styles.button} ${styles.selected}`
                        : styles.button
                }
                title="Dark Theme"
                onClick={() => setTheme(Theme.Dark)}
            >
                <MoonIcon className={styles.icon} />
            </button>

            <button
                className={
                    theme === Theme.System
                        ? `${styles.button} ${styles.selected}`
                        : styles.button
                }
                title="System Theme"
                onClick={() => setTheme(Theme.System)}
            >
                <ComputerDesktopIcon className={styles.icon} />
            </button>

            <button
                className={
                    theme === Theme.Light
                        ? `${styles.button} ${styles.selected}`
                        : styles.button
                }
                title="Light Theme"
                onClick={() => setTheme(Theme.Light)}
            >
                <SunIcon className={styles.icon} />
            </button>
        </div>
    )
}
