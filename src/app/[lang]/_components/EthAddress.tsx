'use client'

import { useMemo } from 'react'

type Props = { address: `0x${string}`; shortened?: boolean }

export default function EthAddress({ address, shortened }: Props) {
    const ethAddress = useMemo(() => {
        return shortened
            ? `${address.slice(0, 6)}....${address.slice(-4)}`
            : address
    }, [address])

    return <>{ethAddress}</>
}
