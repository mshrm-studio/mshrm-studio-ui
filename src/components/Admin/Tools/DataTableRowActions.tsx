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
import useDictionary from '@/utils/hooks/useDictionary'

export default function AdminToolsDataTableRowActions({
    tool,
}: {
    tool: Tool
}) {
    const dict = useDictionary()

    const { toast } = useToast()

    function copy(content: string) {
        navigator.clipboard.writeText(content)

        toast({
            title: dict.event.copied,
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
                <DropdownMenuLabel>
                    {dict.admin.dataTable.actions}
                </DropdownMenuLabel>

                <DropdownMenuItem onClick={() => copy(tool.logoUrl)}>
                    {dict.admin.dataTable.copy.logoUrl}
                </DropdownMenuItem>

                {tool.link && (
                    <DropdownMenuItem onClick={() => copy(tool.link as string)}>
                        {dict.admin.dataTable.copy.link}
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    {dict.admin.dataTable.view.tool}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
