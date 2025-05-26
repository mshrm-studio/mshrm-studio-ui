'use client'

import { DataTable } from '@/app/[lang]/admin/_components/shadcnui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import DataTableRowActions from '@/app/[lang]/admin/assets/_components/DataTableRowActions'
import Asset, { isAssetListResponse } from '@/utils/dto/Asset'
import { useMemo } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import Avatar from '@/app/[lang]/admin/_components/Avatar'
import ConditionalFeedback from '@/app/[lang]/admin/_components/ConditionalFeedback'
import { useSearchParams } from 'next/navigation'
import { assetListFetcher } from '@/utils/repo/assetListFetcher'
import useSWR from 'swr'

export default function AssetsDataTable() {
    const dict = useDictionary()

    const columns = useMemo<ColumnDef<Asset>[]>(() => {
        return [
            {
                accessorKey: 'logo',
                header: dict.attribute.logo,
                cell: ({ row }) => {
                    return (
                        <Avatar
                            src={row.original.logoUrl || '#'}
                            alt={row.original.name || ''}
                        />
                    )
                },
            },
            {
                accessorKey: 'name',
                header: dict.attribute.name,
            },
            {
                id: 'actions',
                header: dict.dataTable.actions,
                cell: ({ row }) => {
                    return <DataTableRowActions asset={row.original} />
                },
            },
        ]
    }, [dict])

    const searchParams = useSearchParams()

    const { data, error, isLoading } = useSWR(searchParams, () =>
        assetListFetcher(searchParams.toString())
    )

    return (
        <ConditionalFeedback fetching={isLoading} error={error}>
            {isAssetListResponse(data) && (
                <DataTable columns={columns} data={data.results} meta={data} />
            )}
        </ConditionalFeedback>
    )
}
