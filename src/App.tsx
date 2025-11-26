import { Route, Routes } from 'react-router-dom'
import { IRoute } from '@/interface/route'
import routes from '@/routes'
import { ThemeProvider } from './context/ThemeProvider'
import { AuthProvider } from './context/AuthContext'

const renderRoutes = (routes: IRoute[]) =>
  routes.map(({ path, component: Component, layout: Layout, children }: IRoute) => {
    const Element = () => {
      return Layout ? (
        <Layout>
          <Component />
        </Layout>
      ) : (
        <Component />
      )
    }
    return (
      <Route key={path} path={path} element={<Element />}>
        {children && renderRoutes(children)}
      </Route>
    )
  })

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <Routes>{renderRoutes(routes)}</Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
