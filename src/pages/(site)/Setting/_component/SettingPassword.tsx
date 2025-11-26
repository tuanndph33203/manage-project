import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { axiosInstance } from '@/config/axios'
import { toast } from '@/hooks/use-toast'

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: 'Mật khẩu cũ phải dài ít nhất 6 ký tự'
    }),
    newPassword: z.string().min(6, {
      message: 'Mật khẩu mới phải dài ít nhất 6 ký tự'
    }),
    confirmPassword: z.string().min(6, {
      message: 'Xác nhận mật khẩu phải dài ít nhất 6 ký tự'
    })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })

const SettingPassword = () => {
  const { user } = useAuth()
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const handlePasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    if (user?._id) {
      const { oldPassword, newPassword } = data
      try {
        const response = await axiosInstance.put('http://localhost:8080/employee/password/' + user._id, {
          oldPassword,
          newPassword
        })
        console.log(response)
        toast({
          title: 'Cập nhật mật khẩu thành công',
          description: 'Mật khẩu của bạn đã được cập nhật.',
          variant: 'default'
        })
        passwordForm.reset()
      } catch (error: any) {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === 'Mật khẩu cũ không đúng'
        ) {
          toast({
            title: 'Mật khẩu không đúng',
            description: 'Mật khẩu cũ bạn nhập không chính xác.',
            variant: 'destructive'
          })
        } else {
          toast({
            title: 'Lỗi khi cập nhật mật khẩu',
            description: 'Không thể cập nhật mật khẩu của bạn.',
            variant: 'destructive'
          })
        }
      }
    } else {
      alert('Vui lòng thử lại')
    }
  }

  return (
    <Form {...passwordForm}>
      <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className='space-y-6 flex flex-col px-40'>
        <h2 className='text-xl font-bold mt-10 mb-4 text-gray-900 dark:text-gray-100'>Cập nhật mật khẩu</h2>
        <FormField
          control={passwordForm.control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>
                Mật khẩu cũ <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Mật khẩu cũ...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={passwordForm.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>
                Mật khẩu mới <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Mật khẩu mới...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={passwordForm.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>
                Xác nhận mật khẩu <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Xác nhận mật khẩu mới...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-center'>
          <Button className='w-full md:w-1/2 py-3 text-base font-semibold' type='submit'>
            Cập nhật
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingPassword
