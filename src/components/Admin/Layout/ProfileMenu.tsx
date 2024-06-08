'use client'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/Admin/shadcnui/dropdown-menu'
import { Button } from '@/components/Admin/shadcnui/button'
import Avatar from '@/components/Admin/Avatar'
import useDictionary from '@/utils/hooks/useDictionary'

export default function AdminLayoutProfileMenu() {
    const dict = useDictionary()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                    >
                        <Avatar src="/placeholder.svg" alt="Avatar" />

                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>John Doe</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>Profile</DropdownMenuItem>

                    <DropdownMenuItem>Settings</DropdownMenuItem>

                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
