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
import { createFormSchema } from '@/app/[lang]/admin/users/_utils/FormSchema'
import FormFieldGroup from '@/app/[lang]/admin/_components/FormFieldGroup'
import User, { isUser } from '@/utils/dto/User'
import MultiSelectFormItem from '@/components/Admin/FormItem/MultiSelect'
import useLocalisedHref from '@/utils/hooks/useLocalisedHref'
import { useToast } from '@/components/Admin/shadcnui/use-toast'
import api from '@/utils/api'

export default function UserForm({ user }: { user?: User }) {
    const dict = useDictionary()
    const { toast } = useToast()
    const { redirectTo } = useLocalisedHref()

    const formSchema = useMemo(() => createFormSchema(dict), [dict])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user?.email || '',
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            roles: user?.roles || [],
        },
    })

    function handleSuccess(response: unknown) {
        toast({
            title: dict.user.event.created,
        })

        redirectTo(
            isUser(response)
                ? `/admin/users/${response.guidId}`
                : '/admin/users'
        )
    }

    function handleFailure(_error: unknown) {
        // TODO: handle failure

        alert('Failed to save user')
    }

    async function saveUser(values: z.infer<typeof formSchema>) {
        try {
            const endpoint = user
                ? `/api/v1/users/guid/${user.guidId}`
                : '/api/v1/users/any-role'

            const response = await api(endpoint, {
                method: user ? 'PATCH' : 'POST',
                body: JSON.stringify(values),
            })

            handleSuccess(response)
        } catch (error) {
            handleFailure(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(saveUser)}>
                <FormFieldGroup>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem
                                label={dict.user.form.item.firstName.label}
                                description={
                                    dict.user.form.item.firstName.description
                                }
                            >
                                <Input
                                    placeholder={
                                        dict.user.form.item.firstName
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
                                label={dict.user.form.item.lastName.label}
                                description={
                                    dict.user.form.item.lastName.description
                                }
                            >
                                <Input
                                    placeholder={
                                        dict.user.form.item.lastName.placeholder
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
                                label={dict.user.form.item.email.label}
                                description={
                                    dict.user.form.item.email.description
                                }
                            >
                                <Input
                                    placeholder={
                                        dict.user.form.item.email.placeholder
                                    }
                                    type="email"
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />

                    <FormItem
                        label={dict.user.form.item.role.label}
                        description={dict.user.form.item.role.description}
                    >
                        <div className="space-y-2">
                            {roleTypes.map((type) => (
                                <FormField
                                    key={type}
                                    control={form.control}
                                    name="roles"
                                    render={({ field }) => (
                                        <MultiSelectFormItem
                                            field={field}
                                            item={{
                                                value: type,
                                                label: dict.enum['RoleType'][
                                                    type
                                                ],
                                            }}
                                        />
                                    )}
                                />
                            ))}
                        </div>
                    </FormItem>

                    <div className="lg:col-span-2">
                        <Button
                            aria-label={dict.user.form.save}
                            title={dict.user.form.save}
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
