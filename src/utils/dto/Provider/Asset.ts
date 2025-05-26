export default interface ProviderAsset {
    name: string
    symbol: string
}

export function isProviderAsset(input: unknown): input is ProviderAsset {
    return (
        typeof input === 'object' &&
        input !== null &&
        'name' in input &&
        'symbol' in input
    )
}

export function isProviderAssetList(input: unknown): input is ProviderAsset[] {
    return Array.isArray(input) && input.every((item) => isProviderAsset(item))
}
