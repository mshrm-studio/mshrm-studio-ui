'use client'

import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/Admin/shadcnui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/Admin/shadcnui/dropdown-menu'
import Tool from '@/utils/dto/Tool'
import { useToast } from '@/components/Admin/shadcnui/use-toast'

export default function AdminToolsDataTableRowActions({
    tool,
}: {
    tool: Tool
}) {
    const { toast } = useToast()

    function copy(content: string) {
        navigator.clipboard.writeText(content)

        toast({
            title: '(TODO) Copied',
            description: content,
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>

                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem onClick={() => copy(tool.logo)}>
                    Copy logo url (TODO)
                </DropdownMenuItem>

                {tool.link && (
                    <DropdownMenuItem onClick={() => copy(tool.link as string)}>
                        Copy link url (TODO)
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem>View customer (TODO)</DropdownMenuItem>

                <DropdownMenuItem>View payment details (TODO)</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
