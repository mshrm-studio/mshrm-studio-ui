'use client'

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
                <Button
                    aria-label={`TODO (translate): Toggle language menu`}
                    title={`TODO (translate): Toggle language menu`}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                >
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
