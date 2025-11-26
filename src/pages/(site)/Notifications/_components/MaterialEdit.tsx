import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IMaterial } from '@/interface/material'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MaterialService } from '@/services/material'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const FormSchema = z.object({
  materialName: z.string().min(1, { message: 'Tên chất liệu không được để trống.' }),
  description: z.string().optional()
})

const MaterialEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [, setMaterial] = useState<IMaterial | null>(null)
  const [loading, setLoading] = useState(true)

  const form = useForm<IMaterial>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      materialName: '',
      description: ''
    }
  })

  useEffect(() => {
    const fetchMaterial = async () => {
      if (!id) {
        console.error('ID không tồn tại')
        return
      }
      try {
        const response = await MaterialService.getMaterialById(id)
        setMaterial(response.data)
        form.reset(response.data)
      } catch (error) {
        console.error('Lỗi khi lấy thông tin chất liệu:', error)
        toast({
          title: 'Lỗi',
          description: 'Không thể lấy thông tin chất liệu.',
          variant: 'destructive',
          duration: 3000
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMaterial()
  }, [id, form])

  const handleSubmit = async (data: IMaterial) => {
    setLoading(true)
    try {
      await MaterialService.updateMaterialById(id!, data)
      toast({
        title: 'Cập nhật thành công',
        description: `chất liệu ${data.materialName} đã được cập nhật thành công.`,
        variant: 'success',
        duration: 3000
      })
      navigate('/material')
    } catch (error) {
      console.error('Lỗi khi cập nhật chất liệu:', error)
      toast({
        title: 'Lỗi cập nhật',
        description: 'Đã xảy ra lỗi khi cập nhật chất liệu.',
        variant: 'destructive',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Đang tải...</div>
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <h1 className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>Cập nhật chất liệu</h1>
      <Form {...form}>
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
                    placeholder='Mô tả'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end mt-6 space-x-3'>
            <Button type='submit'>Cập nhật</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default MaterialEdit
