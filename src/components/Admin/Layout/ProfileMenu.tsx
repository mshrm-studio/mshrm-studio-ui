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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Avatar"
                    />

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
    )
}
