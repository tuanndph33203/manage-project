import { IContainer } from '@/interface/container'
import { cn } from '@/utils/classUtils'

const Container = ({ children, className }: IContainer) => {
  return <div className={cn('container mx-auto', className)}>{children}</div>
}

export default Container
