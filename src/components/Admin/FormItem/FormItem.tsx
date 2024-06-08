import React from 'react'
import {
    FormControl,
    FormDescription,
    FormItem as FormField,
    FormLabel,
    FormMessage,
} from '@/components/Admin/shadcnui/form'

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
            <div className="space-y-2 lg:space-y-0 lg:grid lg:gap-x-6 lg:grid-cols-3">
                <div className="lg:pt-2">
                    <FormLabel>{label}</FormLabel>
                </div>

                <div className="space-y-2 lg:col-span-2">
                    {isSelect ? (
                        children
                    ) : (
                        <FormControl>{children}</FormControl>
                    )}

                    <FormDescription>{description}</FormDescription>

                    <FormMessage />
                </div>
            </div>
        </FormField>
    )
}
