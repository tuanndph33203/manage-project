import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit2, LucideBan, Eye, RefreshCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { ProductService } from '@/services/product'
import { IProduct } from '@/interface/product'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'

interface ProductCellActionProps {
  data: IProduct
}

export const CellAction = ({ data }: ProductCellActionProps) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [isDropdown, setIsDropdown] = useState(false)
  const [open, setOpen] = useState(false)
  const [, setLoading] = useState(false)

  const handleToggleStatus = async () => {
    if (!data._id) {
      toast({
        title: 'Lỗi',
        description: 'ID sản phẩm không tồn tại.',
        variant: 'destructive',
        duration: 3000
      })
      return
    }

    try {
      setLoading(true)
      const product = await ProductService.getById(data._id)
      const updatedStatus = data.status === 'available' ? 'disable' : 'available'
      const updatedData = { ...product, status: updatedStatus }

      await ProductService.update(data._id, updatedData as any)

      toast({
        title: 'Cập nhật trạng thái thành công',
        description: `Sản phẩm "${data.name}" đã được chuyển sang trạng thái "${updatedStatus === 'available' ? 'Đang bán' : 'Ngừng bán'}" .`,
        variant: 'success',
        duration: 3000
      })
      queryClient.invalidateQueries({ queryKey: ['PRODUCT'] })
    } catch (error) {
      toast({
        title: 'Lỗi cập nhật trạng thái sản phẩm',
        description: 'Đã xảy ra lỗi khi cập nhật trạng thái sản phẩm.',
        variant: 'destructive',
        duration: 3000
      })
      console.error('Lỗi khi cập nhật trạng thái sản phẩm:', error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertAcitonDialog
        title={`Bạn có chắc chắn muốn chuyển sản phẩm sang trạng thái "${data.status === 'available' ? 'Ngừng bán' : 'Đang bán'}" ?`}
        variant={'default'}
        className='dark:bg-gray-800 dark:text-white'
        isOpen={open}
        setIsOpen={setOpen}
        handleAciton={handleToggleStatus}
      />
      <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='h-8 w-8 p-0'>
            <span className='sr-only'>Mở menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='font-bold'>Hành Động</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={`/product/info/${data._id}`} className='flex items-center'>
              <Eye className='mr-2 h-4 w-4' />
              Chi tiết
            </Link>
          </DropdownMenuItem>
          {(user?.role === 'admin' || user?.role === 'product') && (
            <DropdownMenuItem>
              <Link to={`/product/edit/${data._id}`} className='flex items-center'>
                <Edit2 className='mr-2 h-4 w-4' />
                Chỉnh sửa
              </Link>
            </DropdownMenuItem>
          )}
          {(user?.role === 'admin' || user?.role === 'product') && (
            <DropdownMenuItem onClick={() => setOpen(true)} className='cursor-pointer'>
              {data.status === 'available' ? (
                <>
                  <LucideBan className='mr-2 h-4 w-4 text-red-500' />
                  Ngừng bán
                </>
              ) : data.status === 'disable' ? (
                <>
                  <RefreshCcw className='mr-2 h-4 w-4 text-green-500' />
                  Chuyển bán
                </>
              ) : null}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
