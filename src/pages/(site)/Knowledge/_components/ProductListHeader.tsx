import { useState } from 'react'
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IProduct } from '@/interface/product'
import { Table } from '@tanstack/react-table'
import { Settings2 } from 'lucide-react'
import { useMultipleCategoryQuery } from '@/hooks/querys/useCategoryQuery'
import { ICategory } from '@/interface/category'

const ProductListHeader = ({
  table,
  selectedStatus,
  setPagination,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory
}: {
  table: Table<IProduct>
  selectedStatus: string
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  setSelectedStatus: (selectedStatus: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}) => {
  const pageSizeOptions: number[] = [10, 20, 30, 40, 50]

  const [searchTerm, setSearchTerm] = useState('')

  const { data: categories, isLoading } = useMultipleCategoryQuery()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    table.getColumn('name')?.setFilterValue(value)
  }

  const columnDisplayNames: Record<string, string> = {
    name: 'Tên sản phẩm',
    images: 'Ảnh',
    categoryId: 'Danh mục',
    materialDetail: 'Chi tiết chất liệu',
    status: 'Trạng thái'
  }

  return (
    <CardHeader className='grid grid-cols-1 sm:grid-cols-4 gap-4 p-3 place-items-center'>
      <Input placeholder='Tìm kiếm sản phẩm...' value={searchTerm} onChange={handleSearchChange} className='mt-[5px]' />

      <Select
        value={selectedCategory}
        onValueChange={(value) => {
          setSelectedCategory(value)
          table.getColumn('categoryName')?.setFilterValue(value === 'all' ? undefined : value)
        }}
        disabled={isLoading}
      >
        <SelectTrigger>
          <SelectValue placeholder='Chọn danh mục' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>Tất cả danh mục</SelectItem>
            {isLoading ? (
              <SelectItem disabled value='loading'>
                Đang tải...
              </SelectItem>
            ) : (
              categories?.data?.map((category: ICategory) => (
                <SelectItem key={category._id} value={category._id as string}>
                  {category.categoryName}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={selectedStatus}
        onValueChange={(value) => {
          setSelectedStatus(value)
          table.getColumn('status')?.setFilterValue(value === 'all' ? undefined : value)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='Danh sách' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>Tất cả danh sách</SelectItem>
            <SelectItem value='creating'>Chưa bán</SelectItem>
            <SelectItem value='available'>Đang bán</SelectItem>
            <SelectItem value='disable'>Đã ngừng bán</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

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
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columnDisplayNames[column.id] || column.id}
              </DropdownMenuCheckboxItem>
            ))}
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

export default ProductListHeader
