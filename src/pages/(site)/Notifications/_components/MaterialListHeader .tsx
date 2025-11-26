import { Button } from '@/components/ui/button'
import { CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { IMaterial } from '@/interface/material'
import { Table } from '@tanstack/react-table'
import { Settings2 } from 'lucide-react'

const MaterialListHeader = ({
  table,
  setPagination
}: {
  table: Table<IMaterial>
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
}) => {
  const pageSizeOptions: number[] = [10, 20, 30, 40, 50]

  const columnDisplayNames: Record<string, string> = {
    materialName: 'Tên chất liệu',
    description: 'Mô tả'
  }

  return (
    <CardHeader className='grid grid-cols-2 sm:grid-cols-3 p-3'>
      <div className='flex items-center space-x-2'></div>
      <Input
        placeholder='Tìm kiếm theo tên vật liệu...'
        value={(table.getColumn('materialName')?.getFilterValue() as string) ?? ''}
        onChange={(event) => {
          const value = event.target.value
          console.log('Giá trị tìm kiếm mới:', value)
          table.getColumn('materialName')?.setFilterValue(value)
        }}
        className='order-last sm:order-first col-span-2 sm:col-span-1'
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-auto'>
            <Settings2 />
            <span className='sr-only'>Hiển thị</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Chuyển đổi các cột</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columnDisplayNames[column.id] || column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
          <DropdownMenuLabel>Bản ghi mỗi trang</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {pageSizeOptions.map((pageSize) => (
            <DropdownMenuCheckboxItem
              key={pageSize}
              checked={table.getState().pagination.pageSize === pageSize}
              onCheckedChange={() =>
                setPagination({
                  pageIndex: 0,
                  pageSize: pageSize
                })
              }
            >
              {pageSize}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  )
}

export default MaterialListHeader
