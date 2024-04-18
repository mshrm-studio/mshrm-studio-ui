'use client'

import { useWeb3Modal } from '@web3modal/ethers/react'
import React from 'react'

export default function WalletConnect({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    const { open } = useWeb3Modal()

    return (
        <button className={className} onClick={() => open()}>
            {children}
        </button>
    )

    /* <button onClick={() => open({ view: 'Networks' })}>
                Open Network Modal
            </button> */
}
