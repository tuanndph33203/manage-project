import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const settingsSchema = z.object({
  avatar: z.string().optional(), // Không bắt buộc
  username: z.string().min(4, {
    message: 'Username phải có ít nhất 4 ký tự'
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự'
  }),
  fullName: z.string().min(6, {
    message: 'Họ và tên phải có ít nhất 6 ký tự'
  }),
  phoneNumber: z.string().default(''),
  role: z.string().default(''),
  address: z.string().default('')
})

const SettingsPage = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}')
  const userId = userData._id

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      avatar: userData.avatar || '',
      username: userData.username || '',
      password: '',
      fullName: userData.fullName || '',
      phoneNumber: userData.phoneNumber || '',
      role: userData.role || '',
      address: userData.address || ''
    }
  })

  const onSubmit = async (data: z.infer<typeof settingsSchema>) => {
  
  }

  return (
    <div className='px-[30px] pt-[38px] pb-[52px] bg-[#F5F6FA]'>
      <h1 className='text-[32px] font-bold mb-[38px]'>Thông tin cá nhân</h1>
      <div className='w-full rounded-xl py-[60px] border-[0.3px] bg-white'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 xl:mx-auto mx-12 lg:mx-20 w-auto xl:w-[788px] flex flex-col items-center justify-center'
          >
            {/* Avatar */}
            <FormField
              control={form.control}
              name='avatar'
              render={({ field }) => (
                <FormItem className='flex flex-col items-center justify-center'>
                  <Avatar className='w-[80px] h-[80px]'>
                    <AvatarImage src={userData.avatar || 'https://assets.codepen.io/1480814/av+1.png'} alt='avatar' />
                    <AvatarFallback>{userData.fullName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button variant={'ghost'} type='button' className='mt-4 text-sm font-semibold text-[#4379EE]'>
                    Tải ảnh lên
                  </Button>
                </FormItem>
              )}
            />

            <div className='grid md:grid-cols-2 gap-x-[60px] w-full gap-y-7 md:gap-y-0'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Username</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        className='bg-[#F1F4F9] h-14'
                        placeholder='Tên đăng nhập của bạn...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        className='bg-[#F1F4F9] h-14'
                        placeholder='Mật khẩu của bạn...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Full Name & Phone Number */}
            <div className='grid md:grid-cols-2 gap-x-[60px] w-full gap-y-7 md:gap-y-0'>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Họ và Tên</FormLabel>
                    <FormControl>
                      <Input type='text' className='bg-[#F1F4F9] h-14' placeholder='Họ và tên của bạn...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input className='bg-[#F1F4F9] h-14' placeholder='Số điện thoại của bạn...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Role & Address */}
            <div className='grid md:grid-flow-col gap-x-[60px] w-full gap-y-7 md:gap-y-0'>
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Vai trò</FormLabel>
                    <FormControl>
                      <Input className='bg-[#F1F4F9] h-14' placeholder='Vai trò của bạn...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg opacity-80 text-[#202224]'>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input className='bg-[#F1F4F9] h-14' placeholder='Địa chỉ của bạn...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' className='mt-8'>
              Lưu thay đổi
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SettingsPage
