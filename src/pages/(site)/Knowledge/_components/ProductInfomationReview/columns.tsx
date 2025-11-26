import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Eye, LockIcon, MoreHorizontal, Star, UnlockIcon } from 'lucide-react'
import { useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { useReviewMutation } from '@/hooks/mutations/useReviewMutation'

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>
    }
  },
  {
    accessorKey: 'reviewText',
    header: 'Nội dung đánh giá',
    cell: ({ row }) => {
      return <p className='w-64 line-clamp-2'>{row.original.reviewText}</p>
    }
  },
  {
    accessorKey: 'rating',
    header: 'Đánh giá',
    cell: ({ row }) => {
      const rating = row.getValue<number>('rating')
      return (
        <div className='flex items-center gap-2 mr-10'>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 cursor-pointer ${
                star <= rating ? 'text-yellow fill-current' : 'text-neutral-950 fill-none'
              }`}
            />
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: 'userId',
    header: 'Người dùng',
    cell: ({ row }) => {
      const userName = row.original.userId?.name || 'Người dùng đã xóa tài khoản'
      return <p className='whitespace-nowrap'>{userName}</p>
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt ? formatDate(row.original.createdAt) : 'N/A'
      return <p>{createdAt}</p>
    }
  },
  {
    header: 'Thao tác',
    cell: ({ row }) => {
      const { mutate } = useReviewMutation('UPDATE')
      const review = row.original
      const [isDropdown, setIsDropdown] = useState(false)
      const handleChangeStatus = (status: boolean) => {
        if (review) {
          mutate({
            id: review._id,
            data: {
              ...review,
              userId: review.userId?._id,
              status
            }
          })
        }
      }
      return (
        <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className='h-8 w-8 p-0'>
              <span className='sr-only'>Mở menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='font-bold'>Hành Động</DropdownMenuLabel>{' '}
            <DropdownMenuItem
              className={review && review.status == false ? 'hidden' : ''}
              onSelect={() => handleChangeStatus(false)}
            >
              <LockIcon className='mr-2 h-4 w-4' /> Khóa bình luận
            </DropdownMenuItem>
            <DropdownMenuItem
              className={review && review.status != false ? 'hidden' : ''}
              onSelect={() => handleChangeStatus(true)}
            >
              <UnlockIcon className='mr-2 h-4 w-4' /> Mở khóa bình luận
            </DropdownMenuItem>
            <DropdownMenuItem className={!review?.userId?._id ? 'hidden' : ''}>
              <Link to={'/account/' + review?.userId?._id} className='flex items-center'>
                <Eye className='mr-2 h-4 w-4' />
                Thông tin khách hàng
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
