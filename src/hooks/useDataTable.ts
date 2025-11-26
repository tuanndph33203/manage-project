import { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'

export const useDataTable = <T>({
  data,
  columns,
  meta,
  totalPage,
  totalData,
  pagination,
  setPagination
}: {
  data: T[]
  columns: ColumnDef<T>[]
  meta?: any
  totalPage?: number
  totalData?: number
  pagination: { pageIndex: number; pageSize: number }
  setPagination: OnChangeFn<PaginationState>
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const rowCount = totalData || 0
  const pageCount = totalPage || 0

  const table = useReactTable({
    data,
    columns,
    rowCount,
    pageCount,
    enableRowSelection: true,
    manualSorting: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    meta: meta
  })

  return { table }
}
