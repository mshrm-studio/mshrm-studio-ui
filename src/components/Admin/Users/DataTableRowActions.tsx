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
import User from '@/utils/dto/User'
import { useToast } from '@/components/Admin/shadcnui/use-toast'
import useDictionary from '@/utils/hooks/useDictionary'

export default function AdminUsersDataTableRowActions({
    user,
}: {
    user: User
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
                <Button
                    aria-label={`TODO (translate): Toggle table row options`}
                    title={`TODO (translate): Toggle table row options`}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                >
                    <span className="sr-only">Open menu</span>

                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    {dict.admin.dataTable.actions}
                </DropdownMenuLabel>

                {user.email && (
                    <DropdownMenuItem
                        onClick={() => copy(user.email as string)}
                    >
                        {dict.admin.dataTable.copy.email}
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    {dict.admin.dataTable.view.user}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
