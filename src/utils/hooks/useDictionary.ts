import { useContext } from 'react'
import DictionaryContext from '@/utils/context/Dictionary'

const useDictionary = () => {
    const dict = useContext(DictionaryContext)

    if (!dict) {
        throw new Error('No dictionary found')
    }

    return dict
}

export default useDictionary
