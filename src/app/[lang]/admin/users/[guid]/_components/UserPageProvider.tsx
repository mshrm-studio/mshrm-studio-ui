'use client'
import ConditionalFeedback from '@/app/[lang]/admin/_components/ConditionalFeedback'
import { isUser } from '@/utils/dto/User'
import { userFetcher } from '@/utils/repo/userFetcher'
import useSWR from 'swr'
import EditForm from '@/app/[lang]/admin/users/_components/Form'
import DeleteForm from '@/app/[lang]/admin/users/[guid]/delete/_components/Form'

type Props = {
    guid: string
    page: 'edit' | 'delete'
}

export default function UserPageProvider({ guid, page }: Props) {
    const { data, error, isLoading } = useSWR(guid, () => userFetcher(guid))

    return (
        <ConditionalFeedback fetching={isLoading} error={error}>
            {isUser(data) && (
                <>
                    {page === 'edit' && <EditForm user={data} />}

                    {page === 'delete' && <DeleteForm user={data} />}
                </>
            )}
        </ConditionalFeedback>
    )
}
