import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/classUtils'
import { NavLink } from 'react-router-dom'

interface SettingSideBarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SettingSideBar({ className, items, ...props }: SettingSideBarProps) {
  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end
          className={({ isActive }) =>
            cn(buttonVariants({ variant: 'link' }), 'justify-start dark:text-gray-900 font-semibold', {
              'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white': isActive,
              'text-gray-900 dark:bg-gray-900 dark:text-white': !isActive,
              'text-gray-800': !isActive,
              'text-gray-800 dark:text-gray-300': !isActive
            })
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}
