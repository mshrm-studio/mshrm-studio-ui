'use client'

import AuthMenuItem from '@/utils/dto/AuthMenuItem'
import AuthMenuLink from '@/components/App/Header/AuthMenu/Link'
import { useDisconnect, useWeb3Modal } from '@web3modal/ethers/react'
import styles from '@/styles/header/authNavigation.module.css'
import useMsalLogout from '@/utils/hooks/useMsalLogout'

type Props = {
    item: AuthMenuItem
}

export default function HeaderAuthMenuAction({ item }: Props) {
    const { open } = useWeb3Modal()
    const { disconnect } = useDisconnect()
    const logout = useMsalLogout()

    function onClick(_e: React.MouseEvent<HTMLButtonElement>) {
        if (item.id === 'connectWallet') {
            open()
        } else if (item.id === 'disconnectWallet') {
            disconnect()
        } else if (item.id === 'microsoftLogout') {
            logout()
        }
    }

    if (typeof item.href === 'string')
        return <AuthMenuLink item={item as AuthMenuItem & { href: string }} />

    return (
        <div>
            <button
                className={styles.button}
                aria-label={item.actionText}
                title={item.actionText}
                onClick={onClick}
            >
                {item.actionText}
            </button>
        </div>
    )
}
