import { createContext, Dispatch, SetStateAction } from 'react'
import { Theme } from '@/utils/enums/Theme'

const ThemeContext = createContext<{
    darkClassToggled?: boolean
    setDarkClassToggled: Dispatch<SetStateAction<boolean | undefined>>
    theme: Theme
    setTheme: Dispatch<SetStateAction<Theme>>
}>({
    darkClassToggled: undefined,
    setDarkClassToggled: () => {},
    theme: Theme.System,
    setTheme: () => {},
})

export default ThemeContext
