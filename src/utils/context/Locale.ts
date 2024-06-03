import { createContext } from 'react'
import { Locale } from '@/utils/enums/Locale'

const LocaleContext = createContext<Locale>(Locale.English)

export default LocaleContext
