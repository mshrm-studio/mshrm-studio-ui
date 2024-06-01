'use client'

import * as React from 'react'
import { Languages } from 'lucide-react'
import useLanguage from '@/utils/hooks/useLanguage'
import { Button } from '@/components/Admin/shadcnui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/Admin/shadcnui/dropdown-menu'

export default function LanguageSwitcher() {
    const { changeLanguage, options } = useLanguage()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />

                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        onClick={() => changeLanguage(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}