import { IRoute } from '@/interface/route'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import Signin from '@/pages/(auth)/Signin'
import page404 from '@/pages/(site)/404/404'
import Unauthorized from '@/pages/(site)/Unauthorized/unauthorized'
import Project from '@/pages/(site)/Project/Project'
import Report from '@/pages/(site)/Report/Report'
import CategoryList from '@/pages/(site)/Report/_components/CategoryList'
import Notifications from '@/pages/(site)/Notifications/Notifications'
import MaterialList from '@/pages/(site)/Notifications/_components/MaterialList'
import Knowledge from '@/pages/(site)/Knowledge/Product'
import ProductList from '@/pages/(site)/Knowledge/_components/ProductList'
import SettingsPage from '@/pages/(site)/Settings/page'
import SettingPassword from '@/pages/(site)/Setting/_component/SettingPassword'

const routes: IRoute[] = [
  { path: '/', component: Signin, layout: AuthLayout },
  {
    path: '/dashboard',
    component: Project,
    layout: MainLayout
  },
  {
    path: '/report',
    component: Report,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: CategoryList,
        guard: ['product', 'admin']
      }
    ]
  },
  {
    path: '/notification',
    component: Notifications,
    layout: MainLayout,
    children: [{ path: '', component: MaterialList, guard: ['product', 'admin'] }]
  },
  {
    path: '/knowledge',
    component: Knowledge,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: ProductList,
        guard: ['product', 'admin', 'support', 'order']
      }
    ]
  },

  {
    path: '/setting',
    component: SettingsPage,
    layout: MainLayout,
    children: [
      {
        path: 'security',
        component: SettingPassword,
        guard: ['support', 'admin', 'product', 'order']
      }
    ]
  },
  { path: '/*', component: page404, layout: AuthLayout },
  { path: '/unauthorized', component: Unauthorized, layout: AuthLayout }
]

export default routes
