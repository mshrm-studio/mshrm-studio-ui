import { createContext } from 'react'
import { Dictionary } from '@/app/[lang]/dictionaries'

const DictionaryContext = createContext<Dictionary | undefined>(undefined)

export default DictionaryContext
