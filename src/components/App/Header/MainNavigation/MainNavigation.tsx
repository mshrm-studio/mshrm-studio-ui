'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import styles from '@/utils/styles/header/main-navigation/mainNavigation.module.css'
import Link from 'next/link'
import { useContext, useMemo } from 'react'

type Props = {}

const HeaderMainNavigation: React.FC<Props> = ({}) => {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    const menu = useMemo(() => {
        const menuItemTranslation = dictionary.header.menuItem

        return [
            { id: 'chat', title: menuItemTranslation.chat },
            { id: 'microsoftLogin', title: menuItemTranslation.microsoftLogin },
            { id: 'connectWallet', title: menuItemTranslation.connectWallet },
            { id: 'ourBrand', title: menuItemTranslation.ourBrand },
            { id: 'ourGithub', title: menuItemTranslation.ourGithub },
            { id: 'cms', title: menuItemTranslation.cms, href: '/admin' },
        ]
    }, [])

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
