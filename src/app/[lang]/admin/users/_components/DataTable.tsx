'use client'

import { DataTable } from '@/app/[lang]/admin/_components/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import User, { isUserListResponse } from '@/utils/dto/User'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import DataTableRowActions from '@/app/[lang]/admin/users/_components/DataTableRowActions'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import ConditionalFeedback from '@/app/[lang]/admin/_components/ConditionalFeedback'
import { userListFetcher } from '@/utils/repo/userListFetcher'

export default function UsersDataTable() {
    const dict = useDictionary()

    const columns = useMemo<ColumnDef<User>[]>(() => {
        return [
            {
                accessorKey: 'firstName',
                header: dict.attribute.firstName,
            },
            {
                accessorKey: 'lastName',
                header: dict.attribute.lastName,
            },
            {
                accessorKey: 'email',
                header: dict.attribute.email,
            },
            {
                id: 'actions',
                header: dict.dataTable.actions,
                cell: ({ row }) => {
                    return <DataTableRowActions user={row.original} />
                },
            },
        ]
    }, [dict])

    const searchParams = useSearchParams()

    const { data, error, isLoading } = useSWR(searchParams, () =>
        userListFetcher(searchParams.toString())
    )

    return (
        <ConditionalFeedback fetching={isLoading} error={error}>
            {isUserListResponse(data) && (
                <DataTable columns={columns} data={data.results} meta={data} />
            )}
        </ConditionalFeedback>
    )
}
