'use client'

import { useEffect, useState } from 'react'
import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/solid'
import styles from '@/utils/styles/themeSwitcher.module.css'

export default function HeaderThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState('system')

    useEffect(() => {
        setCurrentTheme(() => {
            const theme = localStorage.getItem('theme')

            if (theme === 'dark' || theme === 'light') {
                return theme
            }

            return 'system'
        })
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            currentTheme === 'dark' ||
                (currentTheme === 'system' &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
        )
    }, [currentTheme])

    function updateTheme(theme: 'light' | 'dark' | 'system') {
        setCurrentTheme(theme)

        if (theme === 'system') {
            localStorage.removeItem('theme')

            document.documentElement.classList.toggle(
                'dark',
                window.matchMedia('(prefers-color-scheme: dark)').matches
            )
        } else {
            localStorage.setItem('theme', theme)
            document.documentElement.classList.toggle('dark', theme === 'dark')
        }
    }

    return (
        <div className="inline-block">
            <div className={styles.options}>
                <button
                    className={
                        currentTheme === 'dark'
                            ? `${styles.button} ${styles.selected}`
                            : styles.button
                    }
                    title="Dark Theme"
                    onClick={() => updateTheme('dark')}
                >
                    <MoonIcon className={styles.icon} />
                </button>

                <button
                    className={
                        currentTheme === 'system'
                            ? `${styles.button} ${styles.selected}`
                            : styles.button
                    }
                    title="System Theme"
                    onClick={() => updateTheme('system')}
                >
                    <ComputerDesktopIcon className={styles.icon} />
                </button>

                <button
                    className={
                        currentTheme === 'light'
                            ? `${styles.button} ${styles.selected}`
                            : styles.button
                    }
                    title="Light Theme"
                    onClick={() => updateTheme('light')}
                >
                    <SunIcon className={styles.icon} />
                </button>
            </div>
        </div>
    )
}
