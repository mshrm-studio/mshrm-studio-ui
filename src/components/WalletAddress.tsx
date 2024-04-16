'use client'

import { useWeb3ModalAccount } from '@web3modal/ethers/react'

export default function WalletAddress() {
    const { address, chainId, isConnected } = useWeb3ModalAccount()

    return <span>{address || '0xN0Tl0gg3d1n'}</span>
}
