'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/Admin/shadcnui/form'
import { Input } from '@/components/Admin/shadcnui/input'
import { Button } from '@/components/Admin/shadcnui/button'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'

export default function AdminToolsForm() {
    const dict = useDictionary()

    // 1 KB = 1 * 1024 bytes
    // 200 KB = 200 * 1024 bytes
    // 1 MB = 1024 * 1024 bytes (1024 KB)
    // 5 MB = 5 * 1024 * 1024 bytes

    const formSchema = useMemo(() => {
        return z.object({
            link: z.string().url({ message: dict.admin.form.rule.url }),
            logo: z
                .instanceof(File)
                .refine((file) => file.size <= 200 * 1024, {
                    message: dict.admin.form.rule.max.size.replace(
                        ':size',
                        '200KB'
                    ),
                })
                .refine(
                    (file) =>
                        [
                            'image/jpg',
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                        ].includes(file.type),
                    {
                        message: dict.admin.form.rule.image,
                    }
                ),
            name: z
                .string()
                .min(2, {
                    message: dict.admin.form.rule.min.length.replace(
                        ':minimum',
                        '2'
                    ),
                })
                .max(50, {
                    message: dict.admin.form.rule.max.length.replace(
                        ':maximum',
                        '50'
                    ),
                }),
        })
    }, [dict])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            logo: undefined,
            link: '',
            name: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {dict.admin.form.tool.name.label}
                            </FormLabel>

                            <FormControl>
                                <Input
                                    placeholder={
                                        dict.admin.form.tool.name.placeholder
                                    }
                                    {...field}
                                />
                            </FormControl>

                            <FormDescription>
                                {dict.admin.form.tool.name.description}
                            </FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {dict.admin.form.tool.link.label}
                            </FormLabel>

                            <FormControl>
                                <Input
                                    placeholder={
                                        dict.admin.form.tool.link.placeholder
                                    }
                                    {...field}
                                />
                            </FormControl>

                            <FormDescription>
                                {dict.admin.form.tool.link.description}
                            </FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {dict.admin.form.tool.logo.label}
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />
                            </FormControl>

                            <FormDescription>
                                {dict.admin.form.tool.logo.description}
                            </FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{dict.admin.form.submit}</Button>
            </form>
        </Form>
    )
}
