import { Outlet } from 'react-router-dom'

const AccountLayout = () => {
  return (
    <div className='p-[30px]'>
      <Outlet />
    </div>
  )
}

export default AccountLayout
