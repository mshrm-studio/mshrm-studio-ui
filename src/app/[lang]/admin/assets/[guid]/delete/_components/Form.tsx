'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import { Button } from '@/components/Admin/shadcnui/button'
import { useToast } from '@/components/Admin/shadcnui/use-toast'
import LocaleLink from '@/components/LocaleLink'
import Asset from '@/utils/dto/Asset'
import api from '@/utils/api'
import useLocalisedHref from '@/utils/hooks/useLocalisedHref'

export default function Form({ asset }: { asset: Asset }) {
    const dict = useDictionary()
    const { toast } = useToast()
    const { redirectTo } = useLocalisedHref()

    function handleSuccess(_response: any) {
        toast({
            title: dict.asset.event.deleted,
        })

        redirectTo('/admin/assets')
    }

    function handleFailure(_error: unknown) {
        // TODO: handle failure
        alert('Failed to delete asset')
    }

    async function deleteAsset(e: React.FormEvent) {
        e.preventDefault()

        try {
            const response = await api(`/api/v1/assets/${asset.guidId}`, {
                method: 'DELETE',
            })

            handleSuccess(response)
        } catch (error) {
            handleFailure(error)
        }
    }

    return (
        <form className="space-y-8" onSubmit={deleteAsset}>
            <p className="font-bold">{dict.asset.deleteForm.title}</p>

            <p>{dict.asset.deleteForm.message}</p>

            <div className="flex space-x-4">
                <div>
                    <LocaleLink href="/admin/assets/">
                        <Button
                            aria-label={dict.asset.deleteForm.cancel}
                            title={dict.asset.deleteForm.cancel}
                            type="button"
                        >
                            {dict.asset.deleteForm.cancel}
                        </Button>
                    </LocaleLink>
                </div>

                <div>
                    <Button
                        aria-label={dict.asset.deleteForm.confirm}
                        title={dict.asset.deleteForm.confirm}
                        type="submit"
                        variant="destructive"
                    >
                        {dict.asset.deleteForm.confirm}
                    </Button>
                </div>
            </div>
        </form>
    )
}
