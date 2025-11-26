import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useEmployeeMutation from '@/hooks/mutations/useEmployeeMutation'
import { z } from 'zod'

const signInSchema = z.object({
  username: z.string().min(1, { message: 'Tên đăng nhập không được để trống.' }),
  password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 ký tự.' }),
  check: z.boolean().default(false).optional()
})

const Signin = () => {
  const { mutate } = useEmployeeMutation({ action: 'SIGN_IN' })

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { username: '', password: '', check: false }
  })

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    mutate({ username: data.username, password: data.password })
  }

  return (
    <div className='min-h-screen flex justify-cente  items-center gap-14'>
      <div className='bg'>
        <h1 className='text-4xl font-bold mb-6'>Chào mừng đến với Platform</h1>
        <p className='text-lg opacity-90 mb-10'>
          Tối ưu hoá quy trình làm việc với nền tảng mạnh mẽ dành cho đội nhóm hiện đại.
        </p>

        <div className='bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-md'>
          <p className='italic'>“Nền tảng này giúp team chúng tôi làm việc nhanh hơn & khoa học hơn!”</p>
        </div>
      </div>

      <div className='w-fit h-fit flex items-center justify-center p-8 bg-slate-50 rounded-md'>
        <div className='max-w-md w-full space-y-8'>
          {/* HEADING */}
          <div className='text-center space-y-1'>
            <h2 className='text-3xl font-bold text-gray-900'>Chào mừng trở lại</h2>
            <p className='text-gray-600'>Đăng nhập để tiếp tục</p>
          </div>

          {/* SOCIAL LOGIN BUTTONS */}
          <div className='space-y-3'>
            <Button variant='outline' className='w-full gap-3 text-black'>
              <img src='google-color-svgrepo-com.svg' className='h-5 w-5' />
              Đăng nhập với Google
            </Button>

            <Button variant='outline' className='w-full gap-3 text-black'>
              <img src='github-142-svgrepo-com.svg' className='h-5 w-5' />
              Đăng nhập với Github
            </Button>

            <Button variant='outline' className='w-full gap-3 text-black'>
              <img src='facebook-1-svgrepo-com.svg' className='h-5 w-5' />
              Đăng nhập với Facebook
            </Button>
          </div>

          {/* DIVIDER */}
          <div className='flex items-center gap-4'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <span className='text-gray-500 text-sm'>HOẶC</span>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          {/* FORM SHADCN */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email / Username</FormLabel>
                    <FormControl>
                      <Input placeholder='yourname@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Nhập mật khẩu' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-between items-center text-sm mt-1'>
                <FormField
                  control={form.control}
                  name='check'
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-2'>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <span className='text-gray-700'>Lưu đăng nhập</span>
                    </FormItem>
                  )}
                />

                <Link to='/forgot-password' className='text-indigo-600 hover:underline'>
                  Quên mật khẩu?
                </Link>
              </div>

              <Button type='submit' className='w-full text-white bg-indigo-600 hover:bg-indigo-700'>
                Đăng nhập
              </Button>
            </form>
          </Form>

          {/* FOOTER */}
          <p className='text-center text-gray-600'>
            Chưa có tài khoản?
            <Link to='/register' className='text-indigo-600 font-medium hover:underline ml-1'>
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin
