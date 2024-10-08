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
import useAxios from '@/utils/hooks/useAxios'
import TemporaryFile, {
    isTemporaryFile,
    isTemporaryFileResponse,
} from '@/utils/dto/TemporaryFile'
import Tool, { isToolResponse } from '@/utils/dto/Tool'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/Admin/shadcnui/use-toast'
import { AxiosError } from 'axios'

export default function AdminToolsForm({ tool }: { tool?: Tool }) {
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
                    message: dict.form.rule.min.length.replace(':minimum', '5'),
                })
                .max(500, {
                    message: dict.form.rule.max.length.replace(
                        ':maximum',
                        '500'
                    ),
                }),
            link: z.string().url({ message: dict.form.rule.url }),
            logo: z
                .instanceof(File)
                .refine((file) => file.size <= 200 * 1024, {
                    message: dict.form.rule.max.size.replace(':size', '200KB'),
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
                        message: dict.form.rule.image,
                    }
                ),
            name: z
                .string()
                .min(2, {
                    message: dict.form.rule.min.length.replace(':minimum', '2'),
                })
                .max(50, {
                    message: dict.form.rule.max.length.replace(
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
            description: tool?.description || '',
            logo: undefined,
            link: tool?.link || '',
            name: tool?.name || '',
            type: tool?.toolType || undefined,
        },
    })

    function handleSuccess(response: any) {
        if (isToolResponse(response)) {
            toast({
                title: dict.tool.event.created,
            })

            router.push(`/admin/tools/${response.data.guidId}`)
        } else {
            // TODO: handle unexpected response
        }
    }

    function handleFailure(_error: AxiosError) {
        // TODO: handle failure
    }

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

        if (tool) {
            axios
                .patch(`/api/v1/tools/${tool.guidId}`, data)
                .then(handleSuccess)
                .catch(handleFailure)
        } else {
            axios
                .post('/api/v1/tools', data)
                .then(handleSuccess)
                .catch(handleFailure)
        }
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
            .post('/api/v1/files/temporary', formData, options)
            .then((response) => {
                if (isTemporaryFileResponse(response)) {
                    saveTool(values, response.data)
                } else {
                    // TODO: handle unexpected response
                }
            })
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
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
                            label={dict.tool.form.item.name.label}
                            description={dict.tool.form.item.name.description}
                        >
                            <Input
                                placeholder={
                                    dict.tool.form.item.name.placeholder
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
                            label={dict.tool.form.item.link.label}
                            description={dict.tool.form.item.link.description}
                        >
                            <Input
                                placeholder={
                                    dict.tool.form.item.link.placeholder
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
                            label={dict.tool.form.item.logo.label}
                            description={dict.tool.form.item.logo.description}
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
                            label={dict.tool.form.item.type.label}
                            placeholder={dict.tool.form.item.type.placeholder}
                            description={dict.tool.form.item.type.description}
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
                            label={dict.tool.form.item.description.label}
                            description={
                                dict.tool.form.item.description.description
                            }
                        >
                            <Textarea
                                placeholder={
                                    dict.tool.form.item.description.description
                                }
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <div className="lg:col-span-2">
                    <Button
                        aria-label={dict.tool.form.save}
                        title={dict.tool.form.save}
                        type="submit"
                    >
                        {dict.form.submit}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
