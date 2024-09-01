'use client'

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/Admin/shadcnui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Input } from '@/components/Admin/shadcnui/input'
import { useState } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    columnToSearch: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    columnToSearch,
}: DataTableProps<TData, TValue>) {
    // TODO: Add searching of multiple columns

    const dict = useDictionary()

    const [sorting, setSorting] = useState<SortingState>([])

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    )

    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex space-x-3 justify-between items-center mb-4">
                {table.getColumn(columnToSearch) && (
                    <Input
                        placeholder={`${dict.admin.dataTable.search}...`}
                        value={
                            (table
                                .getColumn(columnToSearch)
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn(columnToSearch)
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-label={`TODO (translate): Toggle table column options`}
                            title={`TODO (translate): Toggle table column options`}
                            variant="outline"
                            className="ml-auto"
                        >
                            {dict.admin.dataTable.columns}{' '}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {typeof column.columnDef.header ===
                                        'string'
                                            ? column.columnDef.header
                                            : column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
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
                                    {dict.admin.dataTable.noResults}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {dict.admin.dataTable.resultsMeta
                        .replace(
                            ':numberOfResultsShown',
                            table.getFilteredRowModel().rows.length
                        )
                        .replace(
                            ':totalResults',
                            table.getFilteredRowModel().rows.length
                        )}
                </div>

                <div className="space-x-2">
                    <Button
                        aria-label={`TODO (translate): Go to previous page`}
                        title={`TODO (translate): Go to previous page`}
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {dict.admin.dataTable.previous}
                    </Button>

                    <Button
                        aria-label={`TODO (translate): Go to next page`}
                        title={`TODO (translate): Go to next page`}
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {dict.admin.dataTable.next}
                    </Button>
                </div>
            </div>
        </div>
    )
}
