export enum PricingProvider {
    CurrencyFreaks = 'CurrencyFreaks',
    TwelveData = 'TwelveData',
    Mobula = 'Mobula',
    PolygonIO = 'PolygonIO',
    MetalsDev = 'MetalsDev',
}

export const pricingProviders = Object.values(PricingProvider)

export function isPricingProvider(value: unknown): value is PricingProvider {
    return (
        typeof value === 'string' &&
        (pricingProviders as string[]).includes(value)
    )
}
