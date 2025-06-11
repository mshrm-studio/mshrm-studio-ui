'use client'

import styles from '@/app/[lang]/(app)/_styles/marketEntity.module.css'
import Price from '@/app/[lang]/_components/Price'
import PercentageChange from '@/app/[lang]/(app)/_components/MarketEntity/PercentageChange'
import DateTime from '@/app/[lang]/_components/DateTime'
import { Dictionary } from '@/app/[lang]/dictionaries'
import MotionCard from '@/app/[lang]/(app)/_components/MarketEntity/MotionCard'
import Asset from '@/utils/dto/Asset'
import { priceListFetcher } from '@/utils/repo/priceListFetcher'
import { useEffect, useState } from 'react'
import PriceDto from '@/utils/dto/Price'
import { DateTime as LuxonDateTime } from 'luxon'
import { AssetType } from '@/utils/enums/AssetType'

interface Props {
    asset: Asset
    currency: string
    dict: Dictionary
}

export default function MarketEntity({ asset, currency, dict }: Props) {
    const [assetPriceList, setAssetPriceList] = useState<PriceDto[]>([])

    useEffect(() => {
        setAssetPriceList([])

        if (!asset || !asset.symbol || !currency) return

        async function fetchAssetPrice() {
            try {
                const params = new URLSearchParams()

                params.append('baseAsset', currency)

                params.append('symbols[0]', asset.symbol)

                const response = await priceListFetcher(params.toString())

                if (response) {
                    setAssetPriceList(response)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchAssetPrice()
    }, [asset, currency])

    if (assetPriceList.length === 0) return null

    return (
        <MotionCard>
            <div className="text-[58px] font-extrabold mb-2 xl:text-4xl">
                <Price
                    currency={assetPriceList[0].baseAsset.symbol}
                    maximumFractionDigits={
                        assetPriceList[0].asset.assetType === AssetType.Fiat
                            ? 2
                            : 0
                    }
                    minimumFractionDigits={
                        assetPriceList[0].asset.assetType === AssetType.Fiat
                            ? 2
                            : 0
                    }
                    price={assetPriceList[0].price}
                />
            </div>

            <div className={styles.nameAndLogo}>
                <div className="h-[25px] w-[25px] flex-shrink-0 rounded-full bg-black dark:bg-white">
                    {/* LOGO */}
                </div>

                <div className="font-extrabold truncate">{asset.name}</div>
            </div>

            <div className={styles.percentageChange}>
                <PercentageChange
                    percentageChange={0} // Placeholder, replace with actual percentage change
                />
            </div>

            {(assetPriceList[0].marketCap !== null ||
                assetPriceList[0].volume !== null) && (
                <div className={styles.marketCapAndVolume}>
                    {assetPriceList[0].marketCap && (
                        <div className={styles.marketCap}>
                            <label>{dict.home.marketEntity.marketCap}:</label>

                            <div className={styles.value}>
                                <Price
                                    price={assetPriceList[0].marketCap}
                                    currency={
                                        assetPriceList[0].baseAsset.symbol
                                    }
                                />
                            </div>
                        </div>
                    )}

                    {assetPriceList[0].volume && (
                        <div className={styles.volume}>
                            <label>{dict.home.marketEntity.volume}:</label>

                            <div className={styles.value}>
                                <Price
                                    price={assetPriceList[0].volume}
                                    currency={
                                        assetPriceList[0].baseAsset.symbol
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.lastUpdatedAndSource}>
                <div className={styles.lastUpdated}>
                    <label>{dict.home.marketEntity.lastUpdated}:</label>

                    <div className={styles.value}>
                        <DateTime
                            dateTime={
                                assetPriceList[0].updatedDate ||
                                assetPriceList[0].createdDate
                            }
                            format={LuxonDateTime.DATETIME_SHORT_WITH_SECONDS}
                        />
                    </div>
                </div>

                <div className={styles.source}>
                    <label>{dict.home.marketEntity.source}:</label>

                    <div className={styles.value}>{asset.providerType}</div>
                </div>
            </div>
        </MotionCard>
    )
}
