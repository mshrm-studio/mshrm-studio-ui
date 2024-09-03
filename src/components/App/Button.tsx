import styles from '@/styles/button.module.css'

type Props = {
    children: React.ReactNode
    size?: 'base' | 'lg' | 'xl'
    title: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
    children,
    size = 'base',
    title,
    type = 'button',
    onClick,
}: Props) {
    return (
        <button
            className={`${styles.button} ${size}`}
            aria-label={title}
            title={title}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
