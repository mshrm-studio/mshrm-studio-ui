'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import { Button } from '@/components/Admin/shadcnui/button'
import { useToast } from '@/components/Admin/shadcnui/use-toast'
import LocaleLink from '@/components/LocaleLink'
import User from '@/utils/dto/User'
import api from '@/utils/api'
import useLocalisedHref from '@/utils/hooks/useLocalisedHref'

export default function Form({ user }: { user: User }) {
    const dict = useDictionary()
    const { toast } = useToast()
    const { redirectTo } = useLocalisedHref()

    function handleSuccess(_response: any) {
        toast({
            title: dict.user.event.deleted,
        })

        redirectTo('/admin/users')
    }

    function handleFailure(_error: unknown) {
        // TODO: handle failure
        alert('Failed to delete user')
    }

    async function deleteUser(e: React.FormEvent) {
        e.preventDefault()

        try {
            const response = await api(`/api/v1/users/${user.guidId}`, {
                method: 'DELETE',
            })

            handleSuccess(response)
        } catch (error) {
            handleFailure(error)
        }
    }

    return (
        <form className="space-y-8" onSubmit={deleteUser}>
            <p className="font-bold">{dict.user.deleteForm.title}</p>

            <p>{dict.user.deleteForm.message}</p>

            <div className="flex space-x-4">
                <div>
                    <LocaleLink href={`/admin/users/${user.guidId}`}>
                        <Button
                            aria-label={dict.user.deleteForm.cancel}
                            title={dict.user.deleteForm.cancel}
                            type="button"
                        >
                            {dict.user.deleteForm.cancel}
                        </Button>
                    </LocaleLink>
                </div>

                <div>
                    <Button
                        aria-label={dict.user.deleteForm.confirm}
                        title={dict.user.deleteForm.confirm}
                        type="submit"
                        variant="destructive"
                    >
                        {dict.user.deleteForm.confirm}
                    </Button>
                </div>
            </div>
        </form>
    )
}
