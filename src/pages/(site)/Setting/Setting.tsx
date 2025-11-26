import { Separator } from '@/components/ui/separator'
import { SettingSideBar } from './_component/SettingSideBar'
import { Outlet } from 'react-router-dom'

const sidebarNavItems = [
  {
    title: 'Tài Khoản',
    href: '/setting'
  },
  {
    title: 'Bảo mật',
    href: '/setting/security'
  }
]

const SettingPage = () => {
  return (
    <div className='space-y-8 lg:space-y-0 bg-white dark:bg-slate-950 p-10 pb-16 rounded-md'>
      <div className='space-y-0.5 pb-10'>
        <h2 className='text-2xl font-bold tracking-tight'>Cài Đặt</h2>
        <p className='text-muted-foreground'>Quản lý các cài đặt tài khoản của bạn và thiết lập tùy chọn e-mail.</p>
      </div>
      <Separator />
      <div className='grid gird-cols-1 md:grid-cols-[300px_1fr] py-5 gap-6'>
        <aside className='max-w-xs'>
          <SettingSideBar items={sidebarNavItems} />
        </aside>
        <div className='flex-1 w-full p-6 md:p-8 gap-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SettingPage
