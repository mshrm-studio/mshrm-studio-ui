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
            <div className="text-[58px] font-extrabold mb-2">
                <Price
                    price={marketEntity.price}
                    currency={marketEntity.currency}
                />
            </div>

            <div className={styles.nameAndLogo}>
                <div className="h-[25px] w-[25px] rounded-full bg-black dark:bg-white">
                    {/* LOGO */}
                </div>

                <div className="text-[22px] font-extrabold">
                    {marketEntity.name}
                </div>
            </div>

            <div className={styles.percentageChange}>
                <PercentageChange
                    percentageChange={marketEntity.priceChangePercentage}
                />
            </div>

            <div className={styles.marketCapAndVolume}>
                <div className={styles.marketCap}>
                    <label>{dictionary.marketEntity.marketCap}:</label>

                    <div className={styles.value}>
                        <Price
                            price={marketEntity.marketCap}
                            currency={marketEntity.currency}
                        />
                    </div>
                </div>

                <div className={styles.volume}>
                    <label>{dictionary.marketEntity.volume}:</label>

                    <div className={styles.value}>
                        <Price
                            price={marketEntity.volume}
                            currency={marketEntity.currency}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.lastUpdatedAndSource}>
                <div className={styles.lastUpdated}>
                    <label>{dictionary.marketEntity.lastUpdated}:</label>

                    <div className={styles.value}>
                        <DateTime dateTime={marketEntity.lastUpdated} />
                    </div>
                </div>

                <div className={styles.source}>
                    <label>{dictionary.marketEntity.source}:</label>

                    <div className={styles.value}>{marketEntity.source}</div>
                </div>
            </div>
        </div>
    )
}
