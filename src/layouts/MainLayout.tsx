import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import SideBar from '@/components/common/SideBar/SideBar'
import TopBar from '@/components/common/TopBar/TopBar'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'
import useListenOrder from '@/hooks/useListenOrder'
import { Toaster } from 'sonner'
import { useAuthToken } from '@/hooks/useAuthToken'
import useListenUnauthorized from '@/hooks/useListenUnauthorized'

function MainLayout({ children }: { children: React.ReactNode }) {
  // const { isLoading } = useAuth()
  // useAuthToken()
  // useListenOrder()
  // useListenUnauthorized()
  // if (isLoading)
  //   return (
  //     <div className='flex items-center justify-center h-screen'>
  //       <Loader2 size='100' className='animate-spin'></Loader2>
  //     </div>
  //   )
  return (
    <SidebarProvider className='flex-col md:flex-row'>
      <SideBar />
      <SidebarInset className='relative inset-0'>
        <TopBar />
        <div className='px-3 sm:px-5 flex-1 overflow-auto mt-16 md:mt-0 bg-slate-50 dark:bg-slate-900 relative h-full pt-5 pb-16 sm:py-5 space-y-2 sm:space-y-4 box-border'>
          <div className='h-full min-h-full md:h-0 dark:text-slate-200'>{children}</div>
        </div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
