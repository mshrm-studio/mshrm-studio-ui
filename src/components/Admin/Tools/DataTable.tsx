'use client'

import { DataTable } from '@/components/Admin/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import DataTableRowActions from '@/components/Admin/Tools/DataTableRowActions'
import Tool from '@/utils/dto/Tool'
import { useEffect, useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import Avatar from '@/components/Admin/Avatar'
import useTools from '@/utils/hooks/useTools'
import ConditionalFeedback from '@/components/Admin/ConditionalFeedback'
import { useTheme } from 'next-themes'

export default function AdminToolsDataTable() {
    const dict = useDictionary()
    const { resolvedTheme } = useTheme()

    const columns = useMemo<ColumnDef<Tool>[]>(() => {
        return [
            {
                accessorKey: 'logo',
                header: dict.attribute.logo,
                cell: ({ row }) => {
                    return (
                        <Avatar
                            src={`static/stack/${
                                resolvedTheme === 'dark'
                                    ? row.original.darkLogoUrl
                                    : row.original.lightLogoUrl
                            }`}
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

    const { error, fetching, fetchTools, toolList } = useTools()

    useEffect(() => fetchTools(), [])

    return (
        <ConditionalFeedback fetching={fetching} error={error}>
            {toolList && (
                <DataTable
                    columns={columns}
                    columnToSearch="name"
                    data={toolList}
                />
            )}
        </ConditionalFeedback>
    )
}
