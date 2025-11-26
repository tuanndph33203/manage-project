import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MaterialService } from '@/services/material'
import { useState } from 'react'
import { IMaterial } from '@/interface/material'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'

const FormSchema = z.object({
  materialName: z.string().min(1, { message: 'Tên chất liệu không được để trống.' }),
  description: z.string().optional()
})

const AddMaterialForm = () => {
  const [, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm<IMaterial>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      materialName: '',
      description: ''
    }
  })

  const handleSubmit = async (data: IMaterial) => {
    setLoading(true)
    try {
      await MaterialService.create(data)
      toast({
        title: 'Thêm thành công',
        description: `chất liệu ${data.materialName} đã được thêm thành công.`,
        variant: 'success',
        duration: 3000
      })
      form.reset()
      navigate('/material')
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast({
          title: 'Lỗi trùng tên chất liệu',
          description: `chất liệu "${data.materialName}" đã tồn tại.`,
          variant: 'destructive',
          duration: 3000
        })
      } else {
        toast({
          title: 'Lỗi thêm chất liệu',
          description: 'Đã xảy ra lỗi khi thêm chất liệu.',
          variant: 'destructive',
          duration: 3000
        })
      }
      console.error('Lỗi khi tạo chất liệu:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <Form {...form}>
        <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>Thêm chất liệu</div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
          <FormField
            name='materialName'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='materialName' className='font-bold dark:text-gray-100'>
                  Tên chất liệu<span className='text-red-500'> *</span>
                </Label>
                <FormControl>
                  <Input
                    id='materialName'
                    placeholder='Tên chất liệu'
                    {...field}
                    aria-required='true'
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='description' className='font-bold dark:text-gray-100'>
                  Mô tả
                </Label>
                <FormControl>
                  <Textarea
                    id='description'
                    placeholder='Mô tả chất liệu'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end mt-6 space-x-3'>
            <Button type='submit'>Thêm</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddMaterialForm
