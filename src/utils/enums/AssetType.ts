export enum AssetType {
    Fiat = 'Fiat',
    Crypto = 'Crypto',
    Stocks = 'Stocks',
    Metals = 'Metals',
}

export const assetTypes = Object.values(AssetType)

export function isAssetType(value: unknown): value is AssetType {
    return typeof value === 'string' && (assetTypes as string[]).includes(value)
}
