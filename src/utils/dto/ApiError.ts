export default interface ApiError {
    FailureCode: string // EG UserDoesntExist
    detail: string // EG User doesn't exist
    instance: string // Mshrm.Studio.Auth.Api
    status: number // 404
    title: string // NotFound
    traceId: string // 00-2cae70277cf03a097e78d880ec498bed-fcbef777f2b90fc8-00
}

export function isApiError(error: unknown): error is ApiError {
    return (
        error !== null &&
        typeof error === 'object' &&
        'FailureCode' in error &&
        typeof error.FailureCode === 'string' &&
        'detail' in error &&
        typeof error.detail === 'string' &&
        'instance' in error &&
        typeof error.instance === 'string' &&
        'status' in error &&
        typeof error.status === 'number' &&
        'title' in error &&
        typeof error.title === 'string' &&
        'traceId' in error &&
        typeof error.traceId === 'string'
    )
}
