import { Shape } from '@/assets'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div
      className='w-100 h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center overflow-hidden'
    >
      {children}
    </div>
  )
}

export default AuthLayout
