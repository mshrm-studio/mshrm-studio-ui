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
import User from '@/utils/dto/User'
import { useToast } from '@/app/[lang]/admin/_components/shadcnui/use-toast'
import useDictionary from '@/utils/hooks/useDictionary'
import LocaleLink from '@/app/[lang]/_components/LocaleLink'

export default function DataTableRowActions({ user }: { user: User }) {
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

                <DropdownMenuItem onClick={() => copy(user.email)}>
                    {dict.dataTable.copy.email}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/users/${user.guidId}`}>
                        {dict.dataTable.view.user}
                    </LocaleLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/users/${user.guidId}/edit`}>
                        {dict.dataTable.edit.user}
                    </LocaleLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LocaleLink href={`/admin/users/${user.guidId}/delete`}>
                        {dict.dataTable.delete.user}
                    </LocaleLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
