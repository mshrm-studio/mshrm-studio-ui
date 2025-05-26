'use client'

import MarketEntityList from '@/app/[lang]/(app)/_components/MarketEntity/List'
import styles from '@/app/[lang]/(app)/_styles/home.module.css'
import { Dictionary } from '@/app/[lang]/dictionaries'
import Asset from '@/utils/dto/Asset'
import { useState } from 'react'

interface Props {
    assets: Asset[]
    dict: Dictionary
}

export default function HomePageMarketEntities({ assets, dict }: Props) {
    const [currency, setCurrency] = useState('USD')

    const currencies = [
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

    return (
        <section className={styles.marketEntityListSection}>
            <div className="pt-6 xl:pt-0 xl:max-w-site xl:mx-auto">
                <MarketEntityList
                    assets={assets}
                    currency={currency}
                    dict={dict}
                />

                <div className="mt-6 px-6 xl:mt-0">
                    <label htmlFor="currencySelect" className="mr-1">
                        {dict.home.changeCurrency}
                    </label>

                    <select
                        name="currencySelect"
                        id="currencySelect"
                        className="bg-transparent border-b border-black dark:border-white focus:outline-none"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
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
