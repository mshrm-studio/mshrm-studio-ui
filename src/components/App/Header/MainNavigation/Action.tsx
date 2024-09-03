'use client'

import MainNavigationItem from '@/utils/dto/MainNavigationItem'
import MainNavigationLink from '@/components/App/Header/MainNavigation/Link'
import { useDisconnect, useWeb3Modal } from '@web3modal/ethers/react'

type Props = {
    item: MainNavigationItem
}

export default function HeaderMainNavigationAction({ item }: Props) {
    const { open } = useWeb3Modal()
    const { disconnect } = useDisconnect()

    function onClick(_e: React.MouseEvent<HTMLButtonElement>) {
        console.log('mainnavigation/action onClick() item.id', item.id)
        if (item.id === 'cryptoLogin') {
            open()
        } else if (item.id === 'cryptoLogout') {
            disconnect()
        } else {
            // TODO
        }
    }

    if (typeof item.href === 'string')
        return (
            <MainNavigationLink
                item={item as MainNavigationItem & { href: string }}
            />
        )

    return (
        <div className={item.prependedLabel ? 'flex items-center' : ''}>
            {item.prependedLabel && (
                <span className="mr-3">{item.prependedLabel}</span>
            )}

            <button
                className={`${
                    item.prependedLabel
                        ? 'underline text-black/50 dark:text-white/50'
                        : ''
                }`}
                aria-label={item.actionText}
                title={item.actionText}
                onClick={onClick}
            >
                {item.actionText}
            </button>
        </div>
    )
}
