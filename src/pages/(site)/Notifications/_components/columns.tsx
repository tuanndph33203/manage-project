import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { IMaterial } from '@/interface/material'

export const columns: ColumnDef<IMaterial>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>
    }
  },
  {
    accessorKey: 'materialName',
    header: 'Tên chất liệu'
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
