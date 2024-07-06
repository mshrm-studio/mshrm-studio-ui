export default interface TemporaryFile {
    key: string
    createdDate: string
    expiryDate: string
}

export function isTemporaryFile(input: unknown): input is TemporaryFile {
    return typeof input === 'object' && input !== null && 'key' in input
}
