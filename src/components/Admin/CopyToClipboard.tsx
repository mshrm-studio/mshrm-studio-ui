'use client'

import { useToast } from '@/components/Admin/shadcnui/use-toast'
import React from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import { ClipboardCopy } from 'lucide-react'

export default function CopyToClipboard({
    children,
    content,
}: {
    children: React.ReactNode
    content: string
}) {
    const dict = useDictionary()

    const { toast } = useToast()

    function onClick() {
        navigator.clipboard.writeText(content)

        toast({
            title: dict.event.copied,
            description: content,
        })
    }

    return (
        <div className="flex">
            <button
                className="flex-shrink-0 mr-2"
                aria-label={`TODO (translate): Copy to clipboard`}
                title={`TODO (translate): Copy to clipboard`}
                onClick={onClick}
            >
                <ClipboardCopy />
            </button>

            <div>{children}</div>
        </div>
    )
}
