'use client'

import ConditionalFeedback from '@/app/[lang]/admin/_components/ConditionalFeedback'
import DataDisplayItem from '@/app/[lang]/admin/_components/DataDisplayItem'
import { isUser } from '@/utils/dto/User'
import { userFetcher } from '@/utils/repo/userFetcher'
import useSWR from 'swr'
import { Separator } from '@/app/[lang]/admin/_components/shadcnui/separator'
import useDictionary from '@/utils/hooks/useDictionary'

type Props = {
    guid: string
}

export default function DescriptionList({ guid }: Props) {
    const dict = useDictionary()

    const { data, error, isLoading } = useSWR(guid, () => userFetcher(guid))

    return (
        <ConditionalFeedback fetching={isLoading} error={error}>
            {isUser(data) && (
                <dl>
                    <DataDisplayItem label="GUID" copy={data.guidId}>
                        {data.guidId}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label="Email" copy={data.email}>
                        {data.email}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.name}>
                        {data.fullName}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.roles}>
                        {data.roles
                            .map((role) => dict.enum.RoleType[role])
                            .join(', ')}
                    </DataDisplayItem>
                </dl>
            )}
        </ConditionalFeedback>
    )
}
