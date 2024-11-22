'use client'

import { DataTable } from '@/components/Admin/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import DataTableRowActions from '@/app/[lang]/admin/tools/_components/DataTableRowActions'
import Tool, { isToolListResponse } from '@/utils/dto/Tool'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import Avatar from '@/components/Admin/Avatar'
import ConditionalFeedback from '@/components/Admin/ConditionalFeedback'
import { useSearchParams } from 'next/navigation'
import { toolListFetcher } from '@/utils/repo/toolListFetcher'
import useSWR from 'swr'

export default function AdminToolsDataTable() {
    const dict = useDictionary()

    const columns = useMemo<ColumnDef<Tool>[]>(() => {
        return [
            {
                accessorKey: 'logo',
                header: dict.attribute.logo,
                cell: ({ row }) => {
                    return (
                        <Avatar
                            src={row.original.LogoUrl}
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

    const { data, error, isLoading } = useSWR(searchParams, toolListFetcher)

    return (
        <ConditionalFeedback fetching={isLoading} error={error}>
            {isToolListResponse(data) && (
                <DataTable
                    columns={columns}
                    columnToSearch="name"
                    data={data.results}
                />
            )}
        </ConditionalFeedback>
    )
}
