'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext } from 'react'
import Button from '@/components/Button'

export default function ContactUsBtn() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    return <Button size="threexl">{dictionary.action.contactUs}</Button>
}
