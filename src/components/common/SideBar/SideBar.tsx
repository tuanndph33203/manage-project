import { Power, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator
} from '@/components/ui/sidebar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import navMenu from '@/assets/data/navMenu'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { logo } from '@/assets'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import useEmployeeMutation from '@/hooks/mutations/useEmployeeMutation'
import { Button } from '@/components/ui/button'

const SideBar = () => {
  const { user } = useAuth()
  const naviagte = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const { mutate } = useEmployeeMutation({ action: 'LOGOUT' })
  const hasRole = (requiredRoles: string[]) => {
    if (!user?.role) return false
    return requiredRoles.includes(user.role)
  }
  const handleLogout = () => {
    naviagte('/')
    mutate(undefined)
  }
  return (
    <>
      <Sidebar collapsible='icon' className='dark:bg-slate-950'>
        <SidebarHeader className='border-b border-b-slate-200 dark:border-b-slate-800 h-16 flex justify-center'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground dark:text-white'
              >
                <div className=' size-10 text-sidebar-primary-foreground'>
                  <img src={logo} alt='logo' className='w-full h-full object-contain aspect-square' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight dark:text-slate-200'>
                  <span className='truncate font-semibold text-xl'>Platform Name</span>
                  <span className='truncate text-xs dark:text-slate-400'>Trang quản trị</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='dark:text-slate-400'>Thanh điều hướng</SidebarGroupLabel>
            <SidebarMenu>
              {navMenu.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive, isPending }) =>
                      `flex items-center w-full rounded transition-colors duration-200 ${
                        isPending
                          ? 'bg-yellow-200'
                          : isActive
                            ? 'bg-gray-200 dark:bg-slate-700 font-semibold'
                            : 'text-gray-900 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    <SidebarMenuButton tooltip={item.title} className='text-lg px-2 py-7'>
                      {item.icon && <item.icon className='w-7 h-7 mr-2' />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to='/setting'>
                <SidebarMenuButton className='text-lg h-12 p-3 dark:text-slate-200 dark:hover:b g-slate-800'>
                  <Settings className='w-7 h-7' />
                  <span>Tài Khoản</span>
                </SidebarMenuButton>
              </Link>
              <Button variant={'ghost'} className='text-start p-0' onClick={() => setOpen(true)}>
                <SidebarMenuButton className='text-lg h-12 p-3 dark:text-slate-200 dark:hover:bg-slate-800'>
                  <Power className='w-7 h-7' />
                  <span>Đăng Xuất</span>
                </SidebarMenuButton>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <AlertAcitonDialog
        title='Bạn chắc chắn muốn đăng xuất?'
        description='Bạn sẽ bị đăng xuất khỏi tài khoản của mình. Bạn có muốn tiếp tục?'
        variant={'default'}
        isOpen={open}
        setIsOpen={setOpen}
        handleAciton={handleLogout}
      />
    </>
  )
}

export default SideBar
