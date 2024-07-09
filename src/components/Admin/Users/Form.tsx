'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Admin/shadcnui/input'
import { Button } from '@/components/Admin/shadcnui/button'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import FormItem from '@/components/Admin/FormItem/FormItem'
import { Form, FormField } from '@/components/Admin/shadcnui/form'
import { roleTypes } from '@/utils/enums/RoleType'
import SelectFormItem from '@/components/Admin/FormItem/Select'

export default function AdminUsersForm() {
    const dict = useDictionary()

    const formSchema = useMemo(() => {
        return z.object({
            email: z.string().email(),
            firstName: z
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
            lastName: z
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
            role: z.string(),
        })
    }, [dict])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            role: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 lg:space-y-0 lg:grid lg:gap-8 lg:grid-cols-2"
            >
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem
                            label={dict.admin.user.form.item.firstName.label}
                            description={
                                dict.admin.user.form.item.firstName.description
                            }
                        >
                            <Input
                                placeholder={
                                    dict.admin.user.form.item.firstName
                                        .placeholder
                                }
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem
                            label={dict.admin.user.form.item.lastName.label}
                            description={
                                dict.admin.user.form.item.lastName.description
                            }
                        >
                            <Input
                                placeholder={
                                    dict.admin.user.form.item.lastName
                                        .placeholder
                                }
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem
                            label={dict.admin.user.form.item.email.label}
                            description={
                                dict.admin.user.form.item.email.description
                            }
                        >
                            <Input
                                placeholder={
                                    dict.admin.user.form.item.email.placeholder
                                }
                                type="email"
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <SelectFormItem
                            field={field}
                            label={dict.admin.user.form.item.role.label}
                            placeholder={
                                dict.admin.user.form.item.role.placeholder
                            }
                            description={
                                dict.admin.user.form.item.role.description
                            }
                            options={roleTypes.map((type) => ({
                                value: type,
                                label: dict.enum['RoleType'][type],
                            }))}
                        />
                    )}
                />

                <div className="lg:col-span-2">
                    <Button type="submit">{dict.admin.form.submit}</Button>
                </div>
            </form>
        </Form>
    )
}
