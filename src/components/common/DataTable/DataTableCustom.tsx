import { Table } from '@/components/ui/table'
import { ITableCustom } from '@/interface/table'
import DataTableHead from './_component/DataTableCustomHead'
import DataTableBody from './_component/DataTableCustomBody'
import DataTablePagination from './_component/DataTablePagination'

const DataTableCustom = ({ table, columns, isLoading, isError, refetch }: ITableCustom) => {
  return (
    <>
      <Table>
        <DataTableHead table={table} />
        <DataTableBody table={table} columns={columns} isLoading={isLoading} isError={isError} refetch={refetch} />
      </Table>
      <DataTablePagination table={table} />
    </>
  )
}

export default DataTableCustom
