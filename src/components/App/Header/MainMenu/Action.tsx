'use client'

import MainMenuItem from '@/utils/dto/MainMenuItem'
import MainMenuLink from '@/components/App/Header/MainMenu/Link'
import { useDisconnect, useWeb3Modal } from '@web3modal/ethers/react'

type Props = {
    item: MainMenuItem
}

export default function HeaderMainMenuAction({ item }: Props) {
    const { open } = useWeb3Modal()
    const { disconnect } = useDisconnect()

    function onClick(_e: React.MouseEvent<HTMLButtonElement>) {
        if (item.id === 'connectWallet') {
            open()
        } else if (item.id === 'disconnectWallet') {
            disconnect()
        } else {
            // TODO
        }
    }

    if (typeof item.href === 'string')
        return <MainMenuLink item={item as MainMenuItem & { href: string }} />

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
