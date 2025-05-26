import DestructiveAlert from '@/app/[lang]/admin/_components/DestructiveAlert'
import LoadingImage from '@/app/[lang]/_components/LoadingImage'

export default function ConditionalFeedback({
    children,
    error,
    fetching,
}: {
    children: React.ReactNode
    error?: unknown
    fetching?: boolean
}) {
    if (fetching) return <LoadingImage height={50} width={50} priority />

    if (error)
        return <DestructiveAlert>{JSON.stringify(error)}</DestructiveAlert>

    return <>{children}</>
}
