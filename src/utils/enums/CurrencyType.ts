export enum CurrencyType {
    Fiat = 'Fiat',
    Crypto = 'Crypto',
    Stocks = 'Stocks',
    Metals = 'Metals',
}

export const currencyTypes = Object.values(CurrencyType)

export function isCurrencyType(value: unknown): value is CurrencyType {
    return (
        typeof value === 'string' && (currencyTypes as string[]).includes(value)
    )
}
