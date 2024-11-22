'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import { Button } from '@/components/Admin/shadcnui/button'
import { useToast } from '@/components/Admin/shadcnui/use-toast'
import LocaleLink from '@/components/LocaleLink'
import Tool from '@/utils/dto/Tool'
import api from '@/utils/api'
import useLocalisedHref from '@/utils/hooks/useLocalisedHref'

export default function Form({ tool }: { tool: Tool }) {
    const dict = useDictionary()
    const { toast } = useToast()
    const { redirectTo } = useLocalisedHref()

    function handleSuccess(_response: any) {
        toast({
            title: dict.tool.event.deleted,
        })

        redirectTo('/admin/tools')
    }

    function handleFailure(_error: unknown) {
        // TODO: handle failure
        alert('Failed to delete tool')
    }

    async function deleteTool(e: React.FormEvent) {
        e.preventDefault()

        try {
            const response = await api(`/api/v1/tools/${tool.guidId}`, {
                method: 'DELETE',
            })

            console.log('response:', response)

            handleSuccess(response)
        } catch (error) {
            handleFailure(error)
        }
    }

    return (
        <form className="space-y-8" onSubmit={deleteTool}>
            <p className="font-bold">{dict.tool.deleteForm.title}</p>

            <p>{dict.tool.deleteForm.message}</p>

            <div className="flex space-x-4">
                <div>
                    <LocaleLink href="/admin/tools/">
                        <Button
                            aria-label={dict.tool.deleteForm.cancel}
                            title={dict.tool.deleteForm.cancel}
                            type="button"
                        >
                            {dict.tool.deleteForm.cancel}
                        </Button>
                    </LocaleLink>
                </div>

                <div>
                    <Button
                        aria-label={dict.tool.deleteForm.confirm}
                        title={dict.tool.deleteForm.confirm}
                        type="submit"
                        variant="destructive"
                    >
                        {dict.tool.deleteForm.confirm}
                    </Button>
                </div>
            </div>
        </form>
    )
}
