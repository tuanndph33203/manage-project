import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { ITableCustom } from '@/interface/table'
import { flexRender } from '@tanstack/react-table'
import { AlertCircle } from 'lucide-react'
const DataTableBody = ({ table, columns, isLoading, isError, refetch }: ITableCustom) => {
  const rowCount = 10
  const columnCount = columns.length
  return (
    <TableBody className='overflow-x-auto'>
      {isLoading ? (
        Array.from({ length: rowCount }).map((_, i) => (
          <TableRow key={i} className='hover:bg-transparent'>
            {Array.from({ length: columnCount }).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className='h-6 w-full' />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : isError ? (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-48 text-center'>
            <div className='flex justify-center items-center'>
              <Alert variant='destructive' className='text-center'>
                <AlertCircle className='h-5 w-5 mx-auto' />
                <AlertTitle>Lỗi !</AlertTitle>
                <AlertDescription>Thời gian chờ quá lâu. Vui lòng thử lại.</AlertDescription>
                <Button variant='outline' onClick={() => refetch()} className='mt-4'>
                  Thử lại
                </Button>
              </Alert>
            </div>
          </TableCell>
        </TableRow>
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            Không có bản ghi nào.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody
