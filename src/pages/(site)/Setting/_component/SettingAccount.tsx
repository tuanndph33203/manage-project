import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/AuthContext'
import { toast } from '@/hooks/use-toast'
import { uploadFileCloudinary } from '@/utils/upload-cloudinary'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const settingsSchema = z.object({
  avatar: z.string().default(''),
  fullName: z.string().min(6, { message: 'Full name must be at least 6 characters long' }),
  phoneNumber: z.string().default(''),
  username: z.string().default(''),
  address: z.string().default('')
})

const SettingAccount = () => {
  const auth = useAuth()
  const [avatar, setAvatar] = useState('')

  const settingsForm = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      avatar: '',
      fullName: '',
      username: '',
      phoneNumber: '',
      address: ''
    }
  })

  useEffect(() => {
    if (auth.user) {
      settingsForm.reset({
        avatar: auth.user.avatar,
        fullName: auth.user.fullName,
        username: auth.user.username,
        phoneNumber: auth.user.phoneNumber,
        address: auth.user.address
      })
    }
  }, [auth, settingsForm])

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const urls = await Promise.all(Array.from(files).map(uploadFileCloudinary))
    setAvatar(urls[0])
    settingsForm.setValue('avatar', urls[0])
  }

  const handleSettingsSubmit = async (data: z.infer<typeof settingsSchema>) => {
    try {
      const updatedData = {
        ...data,
        avatar: avatar ? avatar : data.avatar || undefined
      }

      if (auth.user && auth.user._id) {
        const response = await EmployeeService.update(auth.user._id, updatedData)
        auth.updateUser(response.data.data)

        toast({
          title: 'Cập nhật thông tin thành công',
          description: 'Thông tin của bạn đã được cập nhật.',
          variant: 'default'
        })
      } else {
        toast({
          title: 'Không tìm thấy thông tin người dùng',
          description: 'Vui lòng kiểm tra lại thông tin người dùng.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error)
      toast({
        title: 'Lỗi khi cập nhật',
        description: 'Không thể cập nhật thông tin của bạn.',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...settingsForm}>
      <form onSubmit={settingsForm.handleSubmit(handleSettingsSubmit)} className='space-y-6'>
        <FormField
          name='avatar'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center'>
              <Avatar className='w-16 h-16'>
                <AvatarImage src={avatar || field.value} alt='avatar' />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>

              <input id='avatarUpload' type='file' className='hidden' onChange={onChangeImage} />
              <label htmlFor='avatarUpload' className='cursor-pointer text-sm border p-2 rounded-md border-zinc-400'>
                Tải ảnh đại diện
              </label>
            </FormItem>
          )}
        />

        <FormField
          control={settingsForm.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>
                Tên đầy đủ <span className='text-red-500'>*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Your name...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={settingsForm.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>
                Tên tài khoản <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='max-w-xs bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Your username...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={settingsForm.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>
                Số điện thoại <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className='max-w-xs bg-gray-100 dark:bg-gray-700 h-10 text-gray-900 dark:text-gray-100'
                  placeholder='Your phone number...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={settingsForm.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm text-gray-700 dark:text-gray-300'>
                Địa chỉ <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className='bg-gray-100 dark:bg-gray-700 h-32 text-gray-900 dark:text-gray-100'
                  placeholder='Description...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-center'>
          <Button className='w-full md:w-1/2 py-3 text-base font-semibold' type='submit'>
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingAccount
