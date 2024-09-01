'use client'

import MainNavigationItem from '@/utils/dto/MainNavigationItem'
import MainNavigationLink from '@/components/App/Header/MainNavigation/Link'
import { useContext } from 'react'
import ContactFormModalContext from '@/utils/context/ContactFormModal'

type Props = {
    item: MainNavigationItem
}

export default function HeaderMainNavigationAction({ item }: Props) {
    const { setShowContactFormModal } = useContext(ContactFormModalContext)

    function handleContactBtnClick(_e: React.MouseEvent<HTMLButtonElement>) {
        setShowContactFormModal((prev) => !prev)
    }

    if (typeof item.href === 'string')
        return (
            <MainNavigationLink
                item={item as MainNavigationItem & { href: string }}
            />
        )

    if (item.id === 'contactUs')
        return (
            <button onClick={handleContactBtnClick}>{item.actionText}</button>
        )

    return <button>{item.actionText}</button>
}
