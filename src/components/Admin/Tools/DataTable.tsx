'use client'

import { DataTable } from '@/components/Admin/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import DataTableRowActions from '@/components/Admin/Tools/DataTableRowActions'
import Tool from '@/utils/dto/Tool'

const columns: ColumnDef<Tool>[] = [
    {
        accessorKey: 'logo',
        header: 'Logo',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'link',
        header: 'Link',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return <DataTableRowActions tool={row.original} />
        },
    },
]

export default function AdminToolsDataTable({ tools }: { tools: Tool[] }) {
    return <DataTable columns={columns} data={tools} />
}
