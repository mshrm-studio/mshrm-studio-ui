'use client'

import { useToast } from '@/components/Admin/shadcnui/use-toast'
import { Button } from '@/components/Admin/shadcnui/button'
import React from 'react'

export default function CopyToClipboard({
    children,
    content,
}: {
    children: React.ReactNode
    content: string
}) {
    const { toast } = useToast()

    function onClick() {
        navigator.clipboard.writeText(content)

        toast({
            title: '(TODO) Copied',
            description: content,
        })
    }

    return <Button onClick={onClick}>{children}</Button>
}
