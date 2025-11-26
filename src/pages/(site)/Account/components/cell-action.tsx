import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, UserSearch } from 'lucide-react'
import { Link } from 'react-router-dom'
import { UserColumn } from './columns'

interface CellActionProps {
  data: UserColumn
}

export const CellAction = ({ data }: CellActionProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='h-8 w-8 p-0'>
            <span className='sr-only'>Mở menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='font-bold'>Hành động</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={`/account/${data._id}`} className='flex items-center'>
              <UserSearch className='mr-2 h-4 w-4' />
              Thông tin
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
