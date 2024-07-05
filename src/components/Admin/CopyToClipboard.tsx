'use client'

import { useToast } from '@/components/Admin/shadcnui/use-toast'
import { Button } from '@/components/Admin/shadcnui/button'
import React from 'react'
import useDictionary from '@/utils/hooks/useDictionary'

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

    return <Button onClick={onClick}>{children}</Button>
}
