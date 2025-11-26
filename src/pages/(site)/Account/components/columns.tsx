import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { formatDate } from '@/utils/formatDate'

export type UserColumn = {
  _id: string
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Họ và tên'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  // {
  //   accessorKey: 'role',
  //   header: 'Role'
  // },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => {
      return <p>{formatDate(row.getValue('createdAt'))}</p>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
