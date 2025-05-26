'use client'

import { DataTable } from '@/app/[lang]/admin/_components/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import DataTableRowActions from '@/app/[lang]/admin/tools/_components/DataTableRowActions'
import Tool, { isToolListResponse } from '@/utils/dto/Tool'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import Avatar from '@/app/[lang]/admin/_components/Avatar'
import ConditionalFeedback from '@/app/[lang]/admin/_components/ConditionalFeedback'
import { useSearchParams } from 'next/navigation'
import { toolListFetcher } from '@/utils/repo/toolListFetcher'
import useSWR from 'swr'

export default function ToolsDataTable() {
    const dict = useDictionary()

    const columns = useMemo<ColumnDef<Tool>[]>(() => {
        return [
            {
                accessorKey: 'logo',
                header: dict.attribute.logo,
                cell: ({ row }) => {
                    return (
                        <Avatar
                            src={row.original.logoUrl}
                            alt={row.original.name}
                        />
                    )
                },
            },
            {
                accessorKey: 'name',
                header: dict.attribute.name,
            },
            {
                accessorKey: 'link',
                header: dict.attribute.link,
            },
            {
                id: 'actions',
                header: dict.dataTable.actions,
                cell: ({ row }) => {
                    return <DataTableRowActions tool={row.original} />
                },
            },
        ]
    }, [dict])

    const searchParams = useSearchParams()

    const { data, error, isLoading } = useSWR(searchParams, () =>
        toolListFetcher(searchParams.toString())
    )

    return (
        <ConditionalFeedback fetching={isLoading} error={error}>
            {isToolListResponse(data) && (
                <DataTable columns={columns} data={data.results} meta={data} />
            )}
        </ConditionalFeedback>
    )
}
