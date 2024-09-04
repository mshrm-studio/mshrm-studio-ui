'use client'

import AuthMenuItem from '@/utils/dto/AuthMenuItem'
import Link from 'next/link'
import styles from '@/styles/header/authNavigation.module.css'

type Props = {
    item: AuthMenuItem & { href: string }
}

export default function HeaderAuthMenuLink({ item }: Props) {
    return (
        <div>
            <Link
                className={styles.link}
                href={item.href}
                target={item.href.includes('http') ? '_blank' : undefined}
            >
                {item.actionText}
            </Link>
        </div>
    )
}
