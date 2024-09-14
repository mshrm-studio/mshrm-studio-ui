'use client'

import { AlertCircle } from 'lucide-react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/components/Admin/shadcnui/alert'
import useDictionary from '@/utils/hooks/useDictionary'

export default function DestructiveAlert({
    children,
}: {
    children: React.ReactNode
}) {
    const dict = useDictionary()

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />

            <AlertTitle>{dict.common.error}</AlertTitle>

            <AlertDescription className="break-all">
                {children}
            </AlertDescription>
        </Alert>
    )
}
