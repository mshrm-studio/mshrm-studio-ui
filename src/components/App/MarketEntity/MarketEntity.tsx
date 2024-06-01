'use client'

import styles from '@/utils/styles/marketEntity.module.css'
import MarketEntityDto from '@/utils/dto/MarketEntity'
import Price from '@/components/Price'
import PercentageChange from '@/components/App/PercentageChange'
import DateTime from '@/components/DateTime'
import { motion } from 'framer-motion'
import useDictionary from '@/utils/hooks/useDictionary'

export default function MarketEntity({
    marketEntity,
}: {
    marketEntity: MarketEntityDto
}) {
    const dict = useDictionary()

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className={styles.wrapper}
        >
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
                    <label>{dict.marketEntity.marketCap}:</label>

                    <div className={styles.value}>
                        <Price
                            price={marketEntity.marketCap}
                            currency={marketEntity.currency}
                        />
                    </div>
                </div>

                <div className={styles.volume}>
                    <label>{dict.marketEntity.volume}:</label>

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
                    <label>{dict.marketEntity.lastUpdated}:</label>

                    <div className={styles.value}>
                        <DateTime dateTime={marketEntity.lastUpdated} />
                    </div>
                </div>

                <div className={styles.source}>
                    <label>{dict.marketEntity.source}:</label>

                    <div className={styles.value}>{marketEntity.source}</div>
                </div>
            </div>
        </motion.div>
    )
}
