'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/Admin/shadcnui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/Admin/shadcnui/dropdown-menu'
import useDictionary from '@/utils/hooks/useDictionary'

export default function ThemeSwitcher() {
    const dict = useDictionary()

    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-label={`TODO (translate): Toggle theme`}
                    title={`TODO (translate): Toggle theme`}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    disabled={theme === 'light'}
                    onClick={() => setTheme('light')}
                >
                    {dict.header.theme.light}
                </DropdownMenuItem>

                <DropdownMenuItem
                    disabled={theme === 'dark'}
                    onClick={() => setTheme('dark')}
                >
                    {dict.header.theme.dark}
                </DropdownMenuItem>

                <DropdownMenuItem
                    disabled={theme === 'system'}
                    onClick={() => setTheme('system')}
                >
                    {dict.header.theme.system}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
