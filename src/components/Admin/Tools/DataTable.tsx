'use client'

import { DataTable } from '@/components/Admin/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import DataTableRowActions from '@/components/Admin/Tools/DataTableRowActions'
import Tool, { isToolList } from '@/utils/dto/Tool'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import Avatar from '@/components/Admin/Avatar'
import useAxios from '@/utils/hooks/useAxios'
import { isApiPaginatedResponse } from '@/utils/dto/ApiPaginatedResponse'

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
                            src={`static/stack/${row.original.logoUrl}`}
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
                header: dict.admin.dataTable.actions,
                cell: ({ row }) => {
                    return <DataTableRowActions tool={row.original} />
                },
            },
        ]
    }, [dict])

    const axios = useAxios()

    const [tools, setTools] = useState<Tool[]>()

    const getData = useCallback(() => {
        axios
            .get('/aggregator/api/v1/tools')
            .then((response) => {
                if (
                    isApiPaginatedResponse(response.data) &&
                    isToolList(response.data.results)
                ) {
                    setTools(response.data.results)
                } else {
                    // TODO: unexpected response
                }
            })
            .catch((error) => {
                // TODO: handle failure
                console.error(error)
            })
    }, [axios])

    useEffect(() => {
        getData()
    }, [])

    if (!tools) return null

    return <DataTable columns={columns} columnToSearch="name" data={tools} />
}
