export enum PricingProviderType {
    TwelveData = 'TwelveData',
    FreeCurrency = 'FreeCurrency',
    Mobula = 'Mobula',
    PolygonIO = 'PolygonIO',
    MetalsDev = 'MetalsDev',
}

export const pricingProviderTypes = Object.values(PricingProviderType)

export function isPricingProviderType(
    value: unknown
): value is PricingProviderType {
    return (
        typeof value === 'string' &&
        (pricingProviderTypes as string[]).includes(value)
    )
}
