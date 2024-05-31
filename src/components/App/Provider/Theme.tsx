'use client'

import ThemeContext from '@/utils/context/Theme'
import { Theme } from '@/utils/enums/theme'
import { useEffect, useState } from 'react'

export default function ThemeContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [darkClassToggled, setDarkClassToggled] = useState<boolean>()

    const [theme, setTheme] = useState<Theme>(Theme.System)

    useEffect(() => {
        setTheme((_prev) => {
            const theme = localStorage.getItem('theme')

            if (theme === Theme.Dark || theme === Theme.Light) {
                return theme
            }

            return Theme.System
        })
    }, [])

    useEffect(() => {
        if (theme === Theme.System) {
            localStorage.removeItem('theme')
        } else {
            localStorage.setItem('theme', theme)
        }

        setDarkClassToggled(
            (_prev) =>
                theme === Theme.Dark ||
                (theme === Theme.System &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
        )
    }, [theme])

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkClassToggled)
    }, [darkClassToggled])

    return (
        <ThemeContext.Provider
            value={{ darkClassToggled, setDarkClassToggled, theme, setTheme }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
