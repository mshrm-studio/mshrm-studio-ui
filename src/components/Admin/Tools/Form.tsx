'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Admin/shadcnui/input'
import { Button } from '@/components/Admin/shadcnui/button'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import { Textarea } from '@/components/Admin/shadcnui/textarea'
import { toolTypes } from '@/utils/enums/ToolType'
import FormItem from '@/components/Admin/FormItem/FormItem'
import SelectFormItem from '@/components/Admin/FormItem/Select'
import { Form, FormField } from '@/components/Admin/shadcnui/form'
import { Separator } from '@/components/Admin/shadcnui/separator'

export default function AdminToolsForm() {
    const dict = useDictionary()

    // 1 KB = 1 * 1024 bytes
    // 200 KB = 200 * 1024 bytes
    // 1 MB = 1024 * 1024 bytes (1024 KB)
    // 5 MB = 5 * 1024 * 1024 bytes

    const formSchema = useMemo(() => {
        return z.object({
            description: z.string(),
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
            type: z.string(),
        })
    }, [dict])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
            logo: undefined,
            link: '',
            name: '',
            type: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem
                            label={dict.admin.tool.form.item.name.label}
                            description={
                                dict.admin.tool.form.item.name.description
                            }
                        >
                            <Input
                                placeholder={
                                    dict.admin.tool.form.item.name.placeholder
                                }
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <Separator className="my-4" />

                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem
                            label={dict.admin.tool.form.item.link.label}
                            description={
                                dict.admin.tool.form.item.link.description
                            }
                        >
                            <Input
                                placeholder={
                                    dict.admin.tool.form.item.link.placeholder
                                }
                                type="url"
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <Separator className="my-4" />

                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem
                            label={dict.admin.tool.form.item.logo.label}
                            description={
                                dict.admin.tool.form.item.logo.description
                            }
                        >
                            <Input
                                type="file"
                                onChange={(e) =>
                                    field.onChange(e.target.files?.[0] || null)
                                }
                            />
                        </FormItem>
                    )}
                />

                <Separator className="my-4" />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <SelectFormItem
                            field={field}
                            label={dict.admin.tool.form.item.type.label}
                            placeholder={
                                dict.admin.tool.form.item.type.placeholder
                            }
                            description={
                                dict.admin.tool.form.item.type.description
                            }
                            options={toolTypes.map((type) => ({
                                value: type,
                                label: dict.enum['ToolType'][type],
                            }))}
                        />
                    )}
                />

                <Separator className="my-4" />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem
                            label={dict.admin.tool.form.item.description.label}
                            description={
                                dict.admin.tool.form.item.description
                                    .description
                            }
                        >
                            <Textarea
                                placeholder={
                                    dict.admin.tool.form.item.description
                                        .description
                                }
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <Separator className="my-4" />

                <Button type="submit">{dict.admin.form.submit}</Button>
            </form>
        </Form>
    )
}
