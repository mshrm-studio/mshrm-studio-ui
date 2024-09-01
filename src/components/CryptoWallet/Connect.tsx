'use client'

import { useWeb3Modal } from '@web3modal/ethers/react'
import React from 'react'

export default function CryptoWalletConnect({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    const { open } = useWeb3Modal()

    return (
        <button
            className={className}
            aria-label={`TODO (translate): Connect Crypto Wallet`}
            title={`TODO (translate): Connect Crypto Wallet`}
            onClick={() => open()}
        >
            {children}
        </button>
    )
}
