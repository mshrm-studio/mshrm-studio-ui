export enum ProcessingStatus {
    Error = 'Error',
    Idle = 'Idle',
    Pending = 'Pending',
    Success = 'Success',
}

export const processingStatuses = Object.values(ProcessingStatus)

export function isProcessingStatus(value: unknown): value is ProcessingStatus {
    return (
        typeof value === 'string' &&
        (processingStatuses as string[]).includes(value)
    )
}
