import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { IProduct } from '@/interface/product'
import { formatCurrency } from '@/utils/formatCurrency'

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>
    }
  },
  {
    accessorKey: 'name',
    header: 'Tên sản phẩm',
    cell: ({ row }) => {
      return <p className='w-32'>{row.original.name}</p>
    }
  },
  {
    header: 'Ảnh',
    accessorKey: 'images',
    cell: ({ row }) => {
      return <img src={row.original.images[0]} alt={row.original.name} className='w-32 h-32 object-cover rounded-lg' />
    }
  },
  {
    header: 'Danh mục',
    accessorKey: 'categoryId',
    accessorFn: (row: IProduct) => row.category?.categoryName || '',
    cell: ({ row }) => {
      return <p>{row.original.category?.categoryName}</p>
    }
  },
  {
    header: 'Chất liệu',
    cell: ({ row }) => <p className='w-16'>{row.original.material?.materialName || 'N/A'}</p>
  },
  {
    accessorKey: 'materialDetail',
    header: 'Chi tiết chất liệu',
    cell: ({ row }) => <p className='w-36'>{row.getValue<string>('materialDetail') || 'N/A'}</p>
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue<string>('status').toLowerCase()
      let displayStatus = ''
      switch (status) {
        case 'creating':
          displayStatus = 'Chưa bán'
          break
        case 'available':
          displayStatus = 'Đang bán'
          break
        case 'disable':
          displayStatus = 'Đã ngừng bán'
          break
        default:
          displayStatus = 'Không xác định'
      }
      return <p>{displayStatus}</p>
    }
  },
  {
    header: 'Giá (min/max)',
    cell: ({ row }) => {
      const prices = row.original.prices || []
      const minPrice = prices.length ? Math.min(...prices) : 0
      const maxPrice = prices.length ? Math.max(...prices) : 0
      return (
        <div className='flex justify-start'>
          <div className='flex flex-col items-end'>
            <p className='whitespace-nowrap'>{formatCurrency(minPrice)}</p>
            <p className='whitespace-nowrap'>{formatCurrency(maxPrice)}</p>
          </div>
        </div>
      )
    }
  },
  {
    header: 'Tổng số sản phẩm',
    cell: ({ row }) => {
      const stock = row.original.stock || 0
      return <p>{stock}</p>
    }
  },
  {
    header: 'Số lượng đã bán',
    cell: ({ row }) => {
      const outStock = row.original.outStock || 0
      return <p>{outStock}</p>
    }
  },
  {
    id: 'Chức năng',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
