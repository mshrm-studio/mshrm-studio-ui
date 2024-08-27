import styles from '@/styles/button.module.css'

type Props = {
    children: React.ReactNode
    size?: 'base' | 'lg' | 'xl'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ children, onClick, size = 'base' }: Props) {
    return (
        <button className={`${styles.button} ${size}`} onClick={onClick}>
            {children}
        </button>
    )
}
