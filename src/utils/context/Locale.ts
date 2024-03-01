import { createContext } from 'react'
import { Locale } from '@/utils/enums/locale'

const LocaleContext = createContext<Locale>(Locale.English)

export default LocaleContext
