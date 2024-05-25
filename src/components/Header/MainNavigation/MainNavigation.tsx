'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import styles from '@/utils/styles/header/main-navigation/mainNavigation.module.css'
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
            { id: 'chat', label: menuItemTranslation.chat },
            { id: 'microsoftLogin', label: menuItemTranslation.microsoftLogin },
            { id: 'connectWallet', label: menuItemTranslation.connectWallet },
            { id: 'ourBrand', label: menuItemTranslation.ourBrand },
            { id: 'ourGithub', label: menuItemTranslation.ourGithub },
        ]
    }, [])

    return (
        <nav>
            <ul className={styles.ul}>
                {menu.map((item) => (
                    <li key={item.id} className={styles.li}>
                        {item.label}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderMainNavigation
