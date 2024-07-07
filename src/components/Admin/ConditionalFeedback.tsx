import { AxiosError } from 'axios'
import DestructiveAlert from '@/components/Admin/DestructiveAlert'
import { RefreshCw } from 'lucide-react'

export default function ConditionalFeedback({
    children,
    error,
    fetching,
}: {
    children: React.ReactNode
    error?: AxiosError
    fetching?: boolean
}) {
    if (fetching) return <RefreshCw />

    if (error)
        return <DestructiveAlert>{JSON.stringify(error)}</DestructiveAlert>

    return <>{children}</>
}
