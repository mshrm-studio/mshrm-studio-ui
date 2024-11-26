'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/Admin/shadcnui/table'
import { Button } from '@/components/Admin/shadcnui/button'
import { Input } from '@/components/Admin/shadcnui/input'
import { useCallback, useEffect, useState } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import ApiPaginatedResponse from '@/utils/dto/ApiPaginatedResponse'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    meta: ApiPaginatedResponse
}

export function DataTable<TData, TValue>({
    columns,
    data,
    meta,
}: DataTableProps<TData, TValue>) {
    // TODO: Add searching of multiple columns

    const dict = useDictionary()

    const searchParams = useSearchParams()
    const router = useRouter()

    const table = useReactTable({
        columns,
        data,
        manualPagination: true,
        pageCount: Math.ceil(meta.totalResults / meta.perPage),
        state: {
            pagination: {
                pageIndex: meta.pageNumber - 1,
                pageSize: meta.perPage,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const goToPage = useCallback(
        (pageNumber: number) => {
            table.setPageIndex(pageNumber - 1)
            const params = new URLSearchParams(searchParams.toString())
            params.set('pageNumber', pageNumber.toString())
            router.replace(`?${params.toString()}`)
        },
        [searchParams]
    )

    const goToNextPage = useCallback(() => {
        goToPage(meta.pageNumber + 1)
    }, [meta.pageNumber])

    const goToPreviousPage = useCallback(() => {
        goToPage(meta.pageNumber - 1)
    }, [meta.pageNumber])

    const [search, setSearch] = useState(searchParams.get('search') || '')

    useEffect(() => {
        const updateSearch = debounce(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (search) {
                params.set('search', search)
            } else {
                params.delete('search')
            }

            router.replace(`?${params.toString()}`)
        }, 500)

        updateSearch()

        return () => updateSearch.cancel()
    }, [search])

    return (
        <div className="w-full">
            <div className="mb-4">
                <Input
                    className="max-w-sm"
                    placeholder={`${dict.dataTable.search}...`}
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {dict.dataTable.noResults}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {dict.dataTable.resultsMeta
                        .replace(
                            ':numberOfResultsShown',
                            table.getFilteredRowModel().rows.length
                        )
                        .replace(':totalResults', meta.totalResults)}
                </div>

                <div className="space-x-2">
                    <Button
                        aria-label={dict.dataTable.goToPreviousPage}
                        title={dict.dataTable.goToPreviousPage}
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousPage}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {dict.dataTable.previous}
                    </Button>

                    <Button
                        aria-label={dict.dataTable.goToNextPage}
                        title={dict.dataTable.goToNextPage}
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={!table.getCanNextPage()}
                    >
                        {dict.dataTable.next}
                    </Button>
                </div>
            </div>
        </div>
    )
}
