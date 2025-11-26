import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { CategoryService } from '@/services/category'
import { ProductService } from '@/services/product'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { useQueryClient } from '@tanstack/react-query'
import { ICategory } from '@/interface/category'

interface CellActionProps {
  data: ICategory
}

export const CellAction = ({ data }: CellActionProps) => {
  const [isDropdown, setIsDropdown] = useState(false)
  const [open, setOpen] = useState(false)
  const [, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    if (!data._id) {
      toast({
        title: 'Lỗi',
        description: 'ID danh mục không tồn tại.',
        variant: 'destructive',
        duration: 3000
      })
      return
    }

    try {
      setLoading(true)
      const productCount = await ProductService.getProductCountByCategory(data._id)
      if (productCount > 0) {
        toast({
          title: 'Không thể xóa',
          description: `Danh mục ${data.categoryName} vẫn còn sản phẩm.`,
          variant: 'destructive',
          duration: 3000
        })
      } else {
        await CategoryService.deleteCategory(data._id)
        toast({
          title: 'Xóa thành công',
          description: `Danh mục ${data.categoryName} đã được xóa.`,
          variant: 'success',
          duration: 3000
        })
        queryClient.invalidateQueries()
      }
    } catch (error) {
      toast({
        title: 'Lỗi xóa danh mục',
        description: 'Đã xảy ra lỗi khi xóa danh mục.',
        variant: 'destructive',
        duration: 3000
      })
      console.error('Lỗi khi xóa danh mục:', error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertAcitonDialog
        title='Bạn có chắc muốn xóa danh mục này không ?'
        variant={'destructive'}
        className='dark:bg-gray-800 dark:text-white'
        isOpen={open}
        setIsOpen={setOpen}
        handleAciton={handleDelete}
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

          {/* Edit */}
          <DropdownMenuItem>
            <Link to={`/category/edit/${data._id}`} className='flex items-center'>
              <Edit2 className='mr-2 h-4 w-4' />
              Chỉnh sửa
            </Link>
          </DropdownMenuItem>

          {/* Delete */}
          <DropdownMenuItem onClick={() => setOpen(true)} className='text-red-600'>
            <Trash2 className='mr-2 h-4 w-4' />
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
