'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import styles from '@/styles/themeSwitcher.module.css'
import { useTheme } from 'next-themes'
import useDictionary from '@/utils/hooks/useDictionary'

export default function HeaderThemeSwitcher() {
    const dict = useDictionary()
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <button
            className={styles.button}
            aria-label={
                resolvedTheme === 'dark'
                    ? dict.header.switchToLightTheme
                    : dict.header.switchToDarkTheme
            }
            title={
                resolvedTheme === 'dark'
                    ? dict.header.switchToLightTheme
                    : dict.header.switchToDarkTheme
            }
            onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
        >
            {resolvedTheme === 'light' ? (
                <SunIcon className={styles.icon} />
            ) : (
                <MoonIcon className={styles.icon} />
            )}
        </button>
    )
}
