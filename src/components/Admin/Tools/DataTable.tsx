'use client'

import { DataTable } from '@/components/Admin/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import DataTableRowActions from '@/components/Admin/Tools/DataTableRowActions'
import Tool from '@/utils/dto/Tool'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import Avatar from '@/components/Admin/Avatar'

export default function AdminToolsDataTable({ tools }: { tools: Tool[] }) {
    const dict = useDictionary()

    const columns = useMemo<ColumnDef<Tool>[]>(() => {
        return [
            {
                accessorKey: 'logo',
                header: dict.attribute.logo,
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center space-x-3">
                            <Avatar
                                src={`static/stack/${row.original.logo}`}
                                alt={row.original.name}
                            />

                            <div>{row.original.logo}</div>
                        </div>
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
                header: dict.admin.dataTable.actions,
                cell: ({ row }) => {
                    return <DataTableRowActions tool={row.original} />
                },
            },
        ]
    }, [dict])

    return <DataTable columns={columns} data={tools} />
}
