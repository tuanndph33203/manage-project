import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { ICategory } from '@/interface/category'

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>
    }
  },
  {
    accessorKey: 'categoryName',
    header: 'Tên danh mục'
  },
  {
    accessorKey: 'description',
    header: 'Mô tả'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
