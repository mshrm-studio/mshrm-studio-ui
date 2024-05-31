import styles from '@/utils/styles/input.module.css'
import { useMemo } from 'react'

type Props = {
    name: string
    placeholder?: string
    required?: boolean
    type?: 'text' | 'email' | 'url'
}

export default function Input({
    name,
    placeholder,
    required,
    type = 'text',
}: Props) {
    const placeholderWithAsterisk = useMemo(() => {
        if (!placeholder) return undefined

        return required ? `${placeholder} *` : placeholder
    }, [placeholder, required])

    return (
        <input
            className={styles.input}
            name={name}
            placeholder={placeholderWithAsterisk}
            required={required}
            type={type}
        />
    )
}
