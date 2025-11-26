/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { ITable } from '@/interface/table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const DataTablePagination = ({ table }: ITable<any>) => {
  return (
    <CardFooter className='flex flex-wrap items-center justify-between space-x-2 py-4 border-t'>
      <div className='flex-1 text-sm text-muted-foreground'></div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Trang {table.getState().pagination.pageIndex + 1} trên {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Đến trang đầu</span>
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Đến trang cuối</span>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Đến trang tiếp theo</span>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Trở lại trang cũ</span>
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </CardFooter>
  )
}

export default DataTablePagination
