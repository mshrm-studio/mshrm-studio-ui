'use client'

import { DataTable } from '@/components/Admin/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import User from '@/utils/dto/User'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import DataTableRowActions from '@/components/Admin/Users/DataTableRowActions'

export default function AdminUsersDataTable({ users }: { users: User[] }) {
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
                header: dict.admin.dataTable.actions,
                cell: ({ row }) => {
                    return <DataTableRowActions user={row.original} />
                },
            },
        ]
    }, [dict])

    return <DataTable columns={columns} columnToSearch="email" data={users} />
}
