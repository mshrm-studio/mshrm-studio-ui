'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import MarketEntityList from '@/components/App/MarketEntity/List'
import styles from '@/styles/homepage/homepage.module.css'
import marketEntities from '@/utils/content/marketEntities'
import { useMemo } from 'react'

export default function HomePageMarketEntities() {
    const dict = useDictionary()

    const currencies = useMemo(() => {
        return [
            { value: 'AUD', label: '$AUD' },
            { value: 'CAD', label: '$CAD' },
            { value: 'CNY', label: '¥CNY' },
            { value: 'CHF', label: 'CHF' },
            { value: 'EUR', label: '€EUR' },
            { value: 'GBP', label: '£GBP' },
            { value: 'HKD', label: '$HKD' },
            { value: 'JPY', label: '¥JPY' },
            { value: 'USD', label: '$USD' },
        ]
    }, [])

    return (
        <section className={styles.marketEntityListSection}>
            <div className="pt-6 xl:pt-0 xl:max-w-site xl:mx-auto">
                <MarketEntityList marketEntities={marketEntities} />

                <div className="mt-6 px-6 xl:mt-0">
                    <label htmlFor="currencySelect" className="mr-1">
                        {dict.homepage.changeCurrency}
                    </label>

                    <select
                        name="currencySelect"
                        id="currencySelect"
                        className="bg-transparent border-b border-black dark:border-white focus:outline-none"
                    >
                        {currencies.map((currency) => (
                            <option
                                key={currency.value}
                                className="dark:text-black"
                                value={currency.value}
                            >
                                {currency.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    )
}
