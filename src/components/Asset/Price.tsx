'use client'

import { priceListFetcher } from '@/utils/repo/priceListFetcher'
import { useMemo } from 'react'
import useSWR from 'swr'

type Props = {
    assetSymbol: string
    baseAssetSymbol?: string
}

export default function AssetPrice({
    assetSymbol,
    baseAssetSymbol = 'USD',
}: Props) {
    const { data, error, isLoading } = useSWR(
        [assetSymbol, baseAssetSymbol],
        () =>
            priceListFetcher(
                `baseAsset=${baseAssetSymbol}&symbols[0]=${assetSymbol}`
            )
    )

    const marketData = useMemo(() => {
        return data?.find((price) => price.asset.symbol === assetSymbol)
    }, [data])

    if (marketData === undefined) return null

    return (
        <>
            {marketData.baseAsset.symbolNative} {marketData.price} (
            {marketData.updatedDate})
        </>
    )
}
