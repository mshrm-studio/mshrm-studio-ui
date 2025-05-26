import { useMemo } from 'react'

interface Props {
    currency: string
    maximumFractionDigits?: number | null
    minimumFractionDigits?: number | null
    price: number
}

export default function Price({
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
    price,
}: Props) {
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
            minimumFractionDigits: minimumFractionDigits || 0, // No decimals
            maximumFractionDigits: maximumFractionDigits || 0, // No decimals
        }).format(formattedValue)

        return `${formattedPrice}${suffix}`
    }, [currency, maximumFractionDigits, minimumFractionDigits, price])

    return <>{value}</>
}
