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
import LocaleLink from '@/components/LocaleLink'

export default function DataTableRowActions({ tool }: { tool: Tool }) {
    const dict = useDictionary()

    const { toast } = useToast()

    function copy(content: string) {
        navigator.clipboard.writeText(content)

        toast({
            title: dict.common.copied,
            description: content,
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-label={dict.dataTable.toggleTableRowMenu}
                    title={dict.dataTable.toggleTableRowMenu}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                >
                    <span className="sr-only">Open menu</span>

                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{dict.dataTable.actions}</DropdownMenuLabel>

                <DropdownMenuItem onClick={() => copy(tool.LogoUrl)}>
                    {dict.dataTable.copy.logoUrl}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => copy(tool.LogoUrl)}>
                    {dict.dataTable.copy.logoUrl}
                </DropdownMenuItem>

                {tool.link && (
                    <DropdownMenuItem onClick={() => copy(tool.link as string)}>
                        {dict.dataTable.copy.link}
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/tools/${tool.guidId}`}>
                        {dict.dataTable.view.tool}
                    </LocaleLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/tools/${tool.guidId}/edit`}>
                        {dict.dataTable.edit.tool}
                    </LocaleLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/tools/${tool.guidId}/delete`}>
                        {dict.dataTable.delete.tool}
                    </LocaleLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
