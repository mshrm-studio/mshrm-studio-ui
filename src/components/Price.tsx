import { useMemo } from 'react'

export default function Price({
    price,
    currency,
}: {
    price: number
    currency: string
}) {
    const value = useMemo(() => {
        let formattedValue = price

        let suffix = ''

        if (price >= 1_000_000_000_000) {
            formattedValue = price / 1_000_000_000_000
            suffix = 'T'
        } else if (price >= 1_000_000_000) {
            formattedValue = price / 1_000_000_000
            suffix = 'B'
        } else if (price >= 1_000_000) {
            formattedValue = price / 1_000_000
            suffix = 'M'
        }

        const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0, // No decimals
            maximumFractionDigits: 0, // No decimals
        }).format(formattedValue)

        return `${formattedPrice}${suffix}`
    }, [currency, price])

    return <>{value}</>
}
