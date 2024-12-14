'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Admin/shadcnui/input'
import { Button } from '@/components/Admin/shadcnui/button'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import { Textarea } from '@/components/Admin/shadcnui/textarea'
import FormItem from '@/components/Admin/FormItem/FormItem'
import SelectFormItem from '@/components/Admin/FormItem/Select'
import { Form, FormField } from '@/components/Admin/shadcnui/form'
import TemporaryFile, { isTemporaryFile } from '@/utils/dto/TemporaryFile'
import Asset, { isAsset } from '@/utils/dto/Asset'
import { useToast } from '@/components/Admin/shadcnui/use-toast'
import api from '@/utils/api'
import useLocalisedHref from '@/utils/hooks/useLocalisedHref'
import { createFormSchema } from '@/app/[lang]/admin/assets/_utils/FormSchema'
import FormFieldGroup from '@/app/[lang]/admin/_components/FormFieldGroup'
import { assetTypes } from '@/utils/enums/AssetType'
import { pricingProviders } from '@/utils/enums/PricingProvider'

export default function AssetForm({ asset }: { asset?: Asset }) {
    const dict = useDictionary()
    const { toast } = useToast()
    const { redirectTo } = useLocalisedHref()

    const formSchema = useMemo(() => createFormSchema(dict), [dict])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            assetType: asset?.assetType || undefined,
            decimalPlaces: asset?.decimalPlaces || 0,
            description: asset?.description || '',
            logo: undefined,
            name: asset?.name || '',
            providerType: asset?.providerType || undefined,
            symbolNative: asset?.symbolNative || '',
            symbol: asset?.symbol || '',
        },
    })

    async function handleSuccess(response: unknown) {
        const { providerType } = form.getValues()

        const importJobEndpoint = `/api/v1/jobs/import-prices/${providerType}`

        const importResponse = await api(importJobEndpoint, {
            method: 'POST',
        })

        console.log('importResponse:', importResponse)

        toast({
            title: dict.asset.event.created,
        })

        redirectTo(
            isAsset(response)
                ? `/admin/assets/${response.guidId}`
                : '/admin/assets'
        )
    }

    function handleFailure(_error: unknown) {
        // TODO: handle failure

        alert('Failed to save asset')
    }

    async function saveAsset(
        values: z.infer<typeof formSchema>,
        temporaryFile?: TemporaryFile
    ) {
        const data = {
            ...values,
            logo: temporaryFile &&
                values.logo && {
                    temporaryKey: temporaryFile.key,
                    fileName: values.logo.name,
                },
        }

        try {
            const endpoint = asset
                ? `/api/v1/assets/${asset.guidId}`
                : '/api/v1/assets'

            const response = await api(endpoint, {
                method: asset ? 'PATCH' : 'POST',
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
        formData.append('file', values.logo || '')

        try {
            const response = await api('/api/v1/files/temporary', {
                method: 'POST',
                body: formData,
            })

            if (isTemporaryFile(response)) {
                saveAsset(values, response)
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
        if (values.logo) {
            uploadFile(values)
        } else {
            saveAsset(values)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldGroup>
                    <FormField
                        control={form.control}
                        name="assetType"
                        render={({ field }) => (
                            <SelectFormItem
                                field={field}
                                label={dict.asset.form.item.assetType.label}
                                placeholder={
                                    dict.asset.form.item.assetType.placeholder
                                }
                                description={
                                    dict.asset.form.item.assetType.description
                                }
                                options={assetTypes.map((type) => ({
                                    value: type,
                                    label: dict.enum['AssetType'][type],
                                }))}
                            />
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem
                                label={dict.asset.form.item.name.label}
                                description={
                                    dict.asset.form.item.name.description
                                }
                            >
                                <Input
                                    placeholder={
                                        dict.asset.form.item.name.placeholder
                                    }
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="symbol"
                        render={({ field }) => (
                            <FormItem
                                label={dict.asset.form.item.symbol.label}
                                description={
                                    dict.asset.form.item.symbol.description
                                }
                            >
                                <Input
                                    placeholder={
                                        dict.asset.form.item.symbol.placeholder
                                    }
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="symbolNative"
                        render={({ field }) => (
                            <FormItem
                                label={dict.asset.form.item.symbolNative.label}
                                description={
                                    dict.asset.form.item.symbolNative
                                        .description
                                }
                            >
                                <Input
                                    placeholder={
                                        dict.asset.form.item.symbolNative
                                            .placeholder
                                    }
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="providerType"
                        render={({ field }) => (
                            <SelectFormItem
                                field={field}
                                label={dict.asset.form.item.providerType.label}
                                placeholder={
                                    dict.asset.form.item.providerType
                                        .placeholder
                                }
                                description={
                                    dict.asset.form.item.providerType
                                        .description
                                }
                                options={pricingProviders.map((type) => ({
                                    value: type,
                                    label: type,
                                }))}
                            />
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                            <FormItem
                                label={dict.asset.form.item.logo.label}
                                description={
                                    dict.asset.form.item.logo.description
                                }
                            >
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem
                                label={dict.asset.form.item.description.label}
                                description={
                                    dict.asset.form.item.description.description
                                }
                            >
                                <Textarea
                                    placeholder={
                                        dict.asset.form.item.description
                                            .description
                                    }
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />

                    {/* <FormField
                        control={form.control}
                        name="decimalPlaces"
                        render={({ field }) => (
                            <FormItem
                                label={dict.asset.form.item.decimalPlaces.label}
                                description={
                                    dict.asset.form.item.decimalPlaces
                                        .description
                                }
                            >
                                <Input
                                    placeholder={
                                        dict.asset.form.item.decimalPlaces
                                            .placeholder
                                    }
                                    type="number"
                                    {...field}
                                />
                            </FormItem>
                        )}
                    /> */}

                    <div className="lg:col-span-2">
                        <Button
                            aria-label={dict.asset.form.save}
                            title={dict.asset.form.save}
                            type="submit"
                        >
                            {dict.form.submit}
                        </Button>
                    </div>
                </FormFieldGroup>
            </form>
        </Form>
    )
}
