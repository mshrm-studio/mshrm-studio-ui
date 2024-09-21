export default interface TemporaryFile {
    key: string
    createdDate: string
    expiryDate: string
}

export interface TemporaryFileResponse {
    data: TemporaryFile
}

export interface TemporaryFileListResponse {
    data: {
        results: TemporaryFile[]
    }
}

export function isTemporaryFile(input: unknown): input is TemporaryFile {
    return (
        typeof input === 'object' &&
        input !== null &&
        'key' in input &&
        typeof input.key === 'string'
    )
}

export function isTemporaryFileResponse(
    input: unknown
): input is TemporaryFileResponse {
    return (
        typeof input === 'object' &&
        input !== null &&
        'data' in input &&
        isTemporaryFile(input.data)
    )
}
