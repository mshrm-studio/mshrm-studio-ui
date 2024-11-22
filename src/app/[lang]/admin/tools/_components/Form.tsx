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
import TemporaryFile, {
    isTemporaryFile,
    isTemporaryFileResponse,
} from '@/utils/dto/TemporaryFile'
import Tool, { isTool } from '@/utils/dto/Tool'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/Admin/shadcnui/use-toast'
import api from '@/utils/api'
import useLocalisedHref from '@/utils/hooks/useLocalisedHref'

export default function AdminToolsForm({ tool }: { tool?: Tool }) {
    const dict = useDictionary()
    const router = useRouter()
    const { toast } = useToast()
    const { redirectTo } = useLocalisedHref()

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
        toast({
            title: dict.tool.event.created,
        })

        redirectTo(
            isTool(response)
                ? `/admin/tools/${response.guidId}`
                : '/admin/tools'
        )
    }

    function handleFailure(_error: unknown) {
        // TODO: handle failure

        alert('Failed to save tool')
    }

    async function saveTool(
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

        try {
            const endpoint = tool
                ? `/api/v1/tools/${tool.guidId}`
                : '/api/v1/tools'

            const response = await api(endpoint, {
                method: tool ? 'PATCH' : 'POST',
                body: JSON.stringify(data),
            })

            console.log('response:', response)

            handleSuccess(response)
        } catch (error) {
            handleFailure(error)
        }
    }

    async function uploadFile(values: z.infer<typeof formSchema>) {
        const formData = new FormData()
        formData.append('file', values.logo)

        try {
            const response = await api('/api/v1/files/temporary', {
                method: 'POST',
                body: formData,
            })

            if (isTemporaryFile(response)) {
                saveTool(values, response)
            } else {
                console.error('Unexpected response structure:', response)
                // TODO: handle unexpected response
            }
        } catch (error) {
            console.error('File upload failed:', error)
            // TODO: handle error (e.g., show toast or retry)
        }
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
