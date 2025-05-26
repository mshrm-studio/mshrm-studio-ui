'use client'

import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/app/[lang]/admin/_components/shadcnui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/app/[lang]/admin/_components/shadcnui/dropdown-menu'
import Asset from '@/utils/dto/Asset'
import { useToast } from '@/app/[lang]/admin/_components/shadcnui/use-toast'
import useDictionary from '@/utils/hooks/useDictionary'
import LocaleLink from '@/app/[lang]/_components/LocaleLink'

export default function DataTableRowActions({ asset }: { asset: Asset }) {
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

                {typeof asset.logoUrl === 'string' && (
                    <DropdownMenuItem onClick={() => copy(asset.logoUrl || '')}>
                        {dict.dataTable.copy.logoUrl}
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/assets/${asset.guidId}`}>
                        {dict.dataTable.view.asset}
                    </LocaleLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/assets/${asset.guidId}/edit`}>
                        {dict.dataTable.edit.asset}
                    </LocaleLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/assets/${asset.guidId}/delete`}>
                        {dict.dataTable.delete.asset}
                    </LocaleLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
