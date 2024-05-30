import styles from '@/utils/styles/button.module.css'

type Props = {
    children: React.ReactNode
    size?: 'base' | 'threexl' | 'fourxl'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ children, onClick, size = 'base' }: Props) {
    return (
        <button className={`${styles.button} ${size}`} onClick={onClick}>
            {children}
        </button>
    )
}
