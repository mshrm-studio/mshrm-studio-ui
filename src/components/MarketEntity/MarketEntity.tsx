'use client'

import styles from '@/utils/styles/marketEntity.module.css'
import MarketEntityDto from '@/utils/dto/MarketEntity'
import Price from '@/components/Price'
import PercentageChange from '@/components/PercentageChange'
import { useContext } from 'react'
import DictionaryContext from '@/utils/context/Dictionary'
import DateTime from '@/components/DateTime'

export default function MarketEntity({
    marketEntity,
}: {
    marketEntity: MarketEntityDto
}) {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    return (
        <div className={styles.wrapper}>
            <div className="text-[58px] font-extrabold">
                <Price
                    price={marketEntity.price}
                    currency={marketEntity.currency}
                />
            </div>

            <div className="flex items-center space-x-2">
                <div className="h-[25px] w-[25px] rounded-full bg-black dark:bg-white">
                    {/* LOGO */}
                </div>

                <div className="text-[22px] font-extrabold">
                    {marketEntity.name}
                </div>
            </div>

            <PercentageChange
                percentageChange={marketEntity.priceChangePercentage}
            />

            <div>
                <div className="flex space-x-1">
                    <label>{dictionary.marketEntity.marketCap}:</label>

                    <div className="font-bold">
                        <Price
                            price={marketEntity.marketCap}
                            currency={marketEntity.currency}
                        />
                    </div>
                </div>

                <div className="flex space-x-1">
                    <label>{dictionary.marketEntity.volume}:</label>

                    <div className="font-bold">
                        <Price
                            price={marketEntity.volume}
                            currency={marketEntity.currency}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.lastUpdatedAndSource}>
                <div className="flex space-x-1">
                    <label>{dictionary.marketEntity.lastUpdated}:</label>

                    <div className="font-bold">
                        <DateTime dateTime={marketEntity.lastUpdated} />
                    </div>
                </div>

                <div className="flex space-x-1">
                    <label>{dictionary.marketEntity.source}:</label>

                    <div className="font-bold">{marketEntity.source}</div>
                </div>
            </div>
        </div>
    )
}
