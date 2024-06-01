import { useEffect } from 'react'

const useKeyboardShortcut = (key: string, callback: () => void) => {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (
                event.key.toLowerCase() === key.toLocaleLowerCase() &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault()

                callback()
            }
        }

        window.addEventListener('keydown', handler)

        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [key, callback])
}

export default useKeyboardShortcut
