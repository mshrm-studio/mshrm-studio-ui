import React from 'react'
import {
    FormControl,
    FormDescription,
    FormItem as FormField,
    FormLabel,
    FormMessage,
} from '@/app/[lang]/admin/_components/shadcnui/form'

export default function FormItem({
    children,
    label,
    description,
    isSelect = false,
}: {
    children: React.ReactNode
    label: string
    description: string
    isSelect?: boolean
}) {
    return (
        <FormField>
            <FormLabel>{label}</FormLabel>

            {isSelect ? children : <FormControl>{children}</FormControl>}

            <FormDescription>{description}</FormDescription>

            <FormMessage />
        </FormField>
    )
}
