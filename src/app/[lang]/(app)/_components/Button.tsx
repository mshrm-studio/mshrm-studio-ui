'use client'

import styles from '@/app/[lang]/(app)/_styles/button.module.css'
import clsx from 'clsx'
import { useRef } from 'react'

type Props = {
    children: React.ReactNode
    disabled?: boolean
    processing?: boolean
    size?: 'base' | 'lg' | 'xl'
    title: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
    children,
    disabled,
    processing,
    size = 'base',
    title,
    type = 'button',
    onClick,
}: Props) {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const hoverEffectRef = useRef<HTMLSpanElement>(null)

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const hoverEffect = hoverEffectRef.current
        const rect = buttonRef.current?.getBoundingClientRect()

        if (hoverEffect && rect) {
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            hoverEffect.style.left = `${x}px`
            hoverEffect.style.top = `${y}px`
            hoverEffect.style.transform = 'translate(-50%, -50%) scale(1)'
        }
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const hoverEffect = hoverEffectRef.current
        const rect = buttonRef.current?.getBoundingClientRect()

        if (hoverEffect && rect) {
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            hoverEffect.style.left = `${x}px`
            hoverEffect.style.top = `${y}px`
            hoverEffect.style.transform = 'translate(-50%, -50%) scale(0)'
        }
    }

    return (
        <button
            ref={buttonRef}
            className={clsx(styles.button, size)}
            disabled={processing || disabled}
            aria-label={title}
            title={title}
            type={type}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className={styles.content}>{children}</span>

            <span ref={hoverEffectRef} className={styles.hoverEffect}></span>
        </button>
    )
}
