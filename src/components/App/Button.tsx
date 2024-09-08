'use client'

import styles from '@/styles/button.module.css'
import { useRef } from 'react'

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
    const buttonRef = useRef<HTMLButtonElement>(null)

    const hoverEffectRef = useRef<HTMLSpanElement>(null)

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const hoverEffect = hoverEffectRef.current
        const rect = buttonRef.current?.getBoundingClientRect()

        if (hoverEffect && rect) {
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            console.log('handleMouseEnter', x, y)

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
            console.log('handleMouseLeave', x, y)

            hoverEffect.style.left = `${x}px`
            hoverEffect.style.top = `${y}px`
            hoverEffect.style.transform = 'translate(-50%, -50%) scale(0)'
        }
    }

    return (
        <button
            ref={buttonRef}
            className={`${styles.button} ${size}`}
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
