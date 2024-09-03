import styles from '@/styles/marketEntity.module.css'
import MarketEntityDto from '@/utils/dto/MarketEntity'
import Price from '@/components/Price'
import PercentageChange from '@/components/App/MarketEntity/PercentageChange'
import DateTime from '@/components/DateTime'
import { Dictionary } from '@/app/[lang]/dictionaries'
import MotionCard from '@/components/App/MarketEntity/MotionCard'

export default function MarketEntity({
    dict,
    marketEntity,
}: {
    dict: Dictionary
    marketEntity: MarketEntityDto
}) {
    return (
        <MotionCard>
            <div className="text-[58px] font-extrabold mb-2 xl:text-4xl">
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
                    <label>{dict.home.marketEntity.marketCap}:</label>

                    <div className={styles.value}>
                        <Price
                            price={marketEntity.marketCap}
                            currency={marketEntity.currency}
                        />
                    </div>
                </div>

                <div className={styles.volume}>
                    <label>{dict.home.marketEntity.volume}:</label>

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
                    <label>{dict.home.marketEntity.lastUpdated}:</label>

                    <div className={styles.value}>
                        <DateTime dateTime={marketEntity.lastUpdated} />
                    </div>
                </div>

                <div className={styles.source}>
                    <label>{dict.home.marketEntity.source}:</label>

                    <div className={styles.value}>{marketEntity.source}</div>
                </div>
            </div>
        </MotionCard>
    )
}
