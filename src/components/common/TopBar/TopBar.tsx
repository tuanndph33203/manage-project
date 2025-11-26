import { Bell, CircleChevronDown, LogOut, Mail, Maximize, Minimize, Settings } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { DarkMode } from '@/components/modals/DarkMode'
import useFullScreen from '@/hooks/useFullScreen'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import useEmployeeMutation from '@/hooks/mutations/useEmployeeMutation'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { useState } from 'react'

const TopBar = () => {
  const roleMap: Record<string, string> = {
    admin: 'Quản trị viên',
    product: 'Nhân viên kho',
    order: 'Nhân viên bán hàng',
    support: 'Nhân viên hỗ trợ'
  }
  const { user } = useAuth()
  const naviagte = useNavigate()
  const { mutate } = useEmployeeMutation({ action: 'LOGOUT' })
  const { isFullScreen, toggleFullScreen } = useFullScreen()
  const [open, setOpen] = useState<boolean>(false)

  const handleLogout = () => {
    naviagte('/')
    mutate(undefined)
  }

  return (
    <header className='fixed md:sticky w-full top-0 left-0 right-0 z-20 flex h-16 items-center gap-2 bg-white dark:bg-slate-950 border-b border-b-slate-200 dark:border-b-slate-800'>
      <div className='flex items-center justify-between w-full h-full gap-2'>
        <div className='flex items-center px-3 sm:px-5'>
          <SidebarTrigger className='-ml-1 dark:text-slate-200' />
          <Separator orientation='vertical' className='mx-2 h-4' />
        </div>

        <div className='flex items-center space-x-4 sm:space-x-8 h-full'>
          <div className='md:flex hidden items-center space-x-4 lg:space-x-8'>
            <Button
              variant='ghost'
              className='p-2 text-black dark:text-slate-200 focus:outline-none hover:text-blue-500'
              onClick={toggleFullScreen}
            >
              {isFullScreen ? (
                <Minimize className={'h-[1.2rem] w-[1.2rem]'} />
              ) : (
                <Maximize className={'h-[1.2rem] w-[1.2rem]'} />
              )}
            </Button>
            <DarkMode />
          </div>

          <div className='h-full flex items-center space-x-2 bg-[#F5F6FA] dark:bg-slate-800 px-4 py-[10px]'>
            <Avatar>
              <AvatarImage src={user?.avatar} alt='@shadcn' />
            </Avatar>
            <div className='hidden sm:block text-[#404040] dark:text-slate-200'>
              {user && (
                <>
                  <p className='text-sm font-medium'>{user.fullName}</p>
                  <p className='text-sm font-medium'>{roleMap[user?.role ?? ''] || 'Không xác định'}</p>
                </>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='ml-2 dark:text-slate-200'>
                  <CircleChevronDown size={20} strokeWidth={0.75} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem className='dark:text-slate-200 flex items-center space-x-2'>
                    <Settings className='shrink-0' />
                    <Link to='/setting' className='flex-1'>
                      Tài khoản
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-sm text-red-600' onClick={() => setOpen(true)}>
                  <LogOut size={14} className='mr-2' />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <AlertAcitonDialog
        title='Bạn chắc chắn muốn đăng xuất?'
        description='Bạn sẽ bị đăng xuất khỏi tài khoản của mình. Bạn có muốn tiếp tục?'
        variant={'default'}
        isOpen={open}
        setIsOpen={setOpen}
        handleAciton={handleLogout}
        className='dark:bg-gray-800 dark:text-white'
      />
    </header>
  )
}

export default TopBar
