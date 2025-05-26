'use client'

import { useToast } from '@/app/[lang]/admin/_components/shadcnui/use-toast'
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
            title: dict.common.copied,
            description: content,
        })
    }

    return (
        <div className="flex">
            <button
                className="flex-shrink-0 mr-2"
                aria-label={dict.common.copyToClipboard}
                title={dict.common.copyToClipboard}
                onClick={onClick}
            >
                <ClipboardCopy className="h-4 w-4" />
            </button>

            <div>{children}</div>
        </div>
    )
}
