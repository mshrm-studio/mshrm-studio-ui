'use client'

import { set, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Admin/shadcnui/input'
import { Button } from '@/components/Admin/shadcnui/button'
import { useMemo, useState } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import { Textarea } from '@/components/Admin/shadcnui/textarea'
import { toolTypes } from '@/utils/enums/ToolType'
import FormItem from '@/components/Admin/FormItem/FormItem'
import SelectFormItem from '@/components/Admin/FormItem/Select'
import { Form, FormField } from '@/components/Admin/shadcnui/form'
import useAxios from '@/utils/hooks/useAxios'
import TemporaryFile, { isTemporaryFile } from '@/utils/dto/TemporaryFile'
import { isTool } from '@/utils/dto/Tool'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/Admin/shadcnui/use-toast'

export default function AdminToolsForm() {
    const dict = useDictionary()
    const router = useRouter()
    const axios = useAxios()
    const { toast } = useToast()

    // 1 KB = 1 * 1024 bytes
    // 200 KB = 200 * 1024 bytes
    // 1 MB = 1024 * 1024 bytes (1024 KB)
    // 5 MB = 5 * 1024 * 1024 bytes

    const formSchema = useMemo(() => {
        return z.object({
            description: z
                .string()
                .min(5, {
                    message: dict.admin.form.rule.min.length.replace(
                        ':minimum',
                        '5'
                    ),
                })
                .max(500, {
                    message: dict.admin.form.rule.max.length.replace(
                        ':maximum',
                        '500'
                    ),
                }),
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
                            'image/svg',
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

    function saveTool(
        values: z.infer<typeof formSchema>,
        temporaryFile: TemporaryFile
    ) {
        const data = {
            ...values,
            logo: {
                temporaryKey: temporaryFile.key,
                fileName: values.logo.name,
            },
        }

        axios.post('/aggregator/api/v1/tools', data).then((response) => {
            console.log('post tools response')
            console.log(response)

            if (isTool(response.data)) {
                toast({
                    title: dict.admin.tool.event.created,
                })

                router.push(`/admin/tools/${response.data.guidId}`)
            } else {
                // TODO: handle unexpected response
            }
        })
    }

    function uploadFile(values: z.infer<typeof formSchema>) {
        const formData = new FormData()

        formData.append('file', values.logo)

        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }

        axios
            .post('/aggregator/api/v1/files/temporary', formData, options)
            .then((response) => {
                if (isTemporaryFile(response.data)) {
                    saveTool(values, response.data)
                } else {
                    // TODO: handle unexpected response
                }
            })
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        uploadFile(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 lg:space-y-0 lg:grid lg:gap-8 lg:grid-cols-2"
            >
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

                <div className="lg:col-span-2">
                    <Button type="submit">{dict.admin.form.submit}</Button>
                </div>
            </form>
        </Form>
    )
}
