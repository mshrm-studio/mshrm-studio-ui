'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import styles from '@/utils/styles/header/main-navigation/mainNavigation.module.css'
import Link from 'next/link'
import { useMemo } from 'react'

type Props = {}

const HeaderMainNavigation: React.FC<Props> = ({}) => {
    const dict = useDictionary()

    const menu = useMemo(() => {
        const menuItemTranslation = dict.header.menuItem

        return [
            { id: 'chat', title: menuItemTranslation.chat },
            { id: 'microsoftLogin', title: menuItemTranslation.microsoftLogin },
            { id: 'connectWallet', title: menuItemTranslation.connectWallet },
            { id: 'ourBrand', title: menuItemTranslation.ourBrand },
            { id: 'ourGithub', title: menuItemTranslation.ourGithub },
            { id: 'cms', title: menuItemTranslation.cms, href: '/admin' },
        ]
    }, [dict])

    return (
        <nav>
            <ul className={styles.ul}>
                {menu.map((item) => (
                    <li key={item.id} className={styles.li}>
                        {item.href ? (
                            <Link href={item.href}>{item.title}</Link>
                        ) : (
                            item.title
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderMainNavigation
