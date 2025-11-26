/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { FileInput, FileUploader } from '@/components/ui/file-upload'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useMultipleCategoryQuery } from '@/hooks/querys/useCategoryQuery'
import { useMultipleMaterialQuery } from '@/hooks/querys/useMaterialQuery'
import { toast } from '@/hooks/use-toast'
import { ProductFormData } from '@/interface/product'
import { ProductService } from '@/services/product'
import { uploadFileCloudinary } from '@/utils/upload-cloudinary'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' }),
  category: z.string().min(1, { message: 'Vui lòng chọn danh mục.' }),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  material: z.string().min(1, { message: 'Vui lòng chọn chất liệu.' }),
  materialDetail: z.string().optional(),
  status: z.enum(['creating', 'available', 'disable'])
})

const AddProductForm = () => {
  const { data: categories } = useMultipleCategoryQuery()
  const { data: materials } = useMultipleMaterialQuery()
  const [files, setFiles] = useState<File[] | null>(null)
  const [galleryPreview, setGalleryPreview] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true
  }

  const navigate = useNavigate()

  const form = useForm<ProductFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      images: [],
      material: '',
      materialDetail: '',
      status: 'creating'
    }
  })

  const handleSubmit = async (data: any) => {
    try {
      const product = await ProductService.create({
        ...data,
        images: files || ['http://res.cloudinary.com/dfykg7wtt/image/upload/v1733647723/test/ldlnhcdhjd1z82run81q.png']
      })
      toast({
        title: 'Thêm thành công',
        description: `Sản phẩm ${data.name} đã được thêm thành công.`,
        variant: 'success',
        duration: 3000
      })
      form.reset()
      setTimeout(() => {
        navigate(`/product/edit/${product.data.data._id}`)
      }, 2000)
    } catch (error: any) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'SKU đã tồn tại.') {
        toast({
          title: 'Lỗi thêm sản phẩm',
          description: 'SKU đã tồn tại. Vui lòng nhập SKU khác.',
          variant: 'destructive',
          duration: 3000
        })
      } else {
        toast({
          title: 'Lỗi thêm sản phẩm',
          description: 'Đã xảy ra lỗi khi thêm sản phẩm.',
          variant: 'destructive',
          duration: 3000
        })
      }
      console.error('Lỗi khi tạo sản phẩm:', error)
    }
  }

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files
    if (images && images.length > 5) {
      toast({
        title: 'Lỗi',
        description: 'Chỉ được tối đa 5 hình ảnh',
        variant: 'destructive'
      })
      return
    }
    if (!images) return

    setLoading(true)
    try {
      const urls = await Promise.all(Array.from(images).map(uploadFileCloudinary))
      setFiles(urls)
      setGalleryPreview(Array.from(images).map((file) => URL.createObjectURL(file)))
    } catch (error) {
      console.error('Lỗi upload ảnh:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    if (!galleryPreview || !files) return

    const updatedGalleryPreview = galleryPreview.filter((_, i) => i !== index)
    setGalleryPreview(updatedGalleryPreview)

    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
  }

  const isLoading = form.formState.isSubmitting
  if (!categories || !materials) {
    return <div>Loading...</div>
  }
  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen'>
      <Form {...form}>
        <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>Thêm sản phẩm</div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-4 md:px-10'>
          {/* Tên sản phẩm */}
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='name' className='font-bold dark:text-gray-100'>
                  Tên sản phẩm<span className='text-red-500'> *</span>
                </Label>
                <FormControl>
                  <Input
                    id='name'
                    placeholder='Tên sản phẩm'
                    {...field}
                    disabled={isLoading}
                    aria-required='true'
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='lg:flex lg:space-x-10 lg:items-center '>
            {/* Danh mục */}
            <FormField
              name='category'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='category' className='font-bold dark:text-gray-100'>
                    Danh mục<span className='text-red-500'> *</span> -
                  </Label>
                  <FormControl className='ml-2 rounded-sm'>
                    <select
                      id='category'
                      {...field}
                      className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
                    >
                      <option value=''>Chọn danh mục</option>
                      {categories?.data.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* chất liệu */}
            <FormField
              name='material'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='material' className='font-bold dark:text-gray-100'>
                    Chất liệu<span className='text-red-500'> *</span> -
                  </Label>
                  <FormControl className='ml-2 rounded-sm'>
                    <select
                      id='material'
                      {...field}
                      className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
                    >
                      <option value=''>Chọn chất liệu</option>
                      {materials?.data.map((material) => (
                        <option key={material._id} value={material._id}>
                          {material.materialName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Trạng thái */}
            <FormField
              name='status'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='status' className='font-bold dark:text-gray-100'>
                    Trạng thái<span className='text-red-500'> *</span> -
                  </Label>
                  <FormControl className='ml-2 rounded-sm'>
                    <select
                      id='status'
                      {...field}
                      className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
                      disabled
                    >
                      <option value='creating'>Chưa bán</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Mô tả */}
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
                    disabled={isLoading}
                    id='description'
                    placeholder='Mô tả sản phẩm'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Hình ảnh */}

          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem>
                <Label htmlFor='materialDetail' className='font-bold dark:text-gray-100'>
                  Hình ảnh
                </Label>
                <FormControl>
                  <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                    className='relative bg-background rounded-lg p-2'
                  >
                    <FileInput
                      id='fileInput'
                      className='outline-dashed outline-1 outline-slate-500'
                      onChange={onChangeImage}
                      disabled={loading}
                    >
                      <div className='flex items-center justify-center flex-col p-8 w-full '>
                        <CloudUpload className='text-gray-500 w-10 h-10' />
                        <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
                          <span className='font-semibold'>Bấm để upload</span>
                          &nbsp; hoặc là kéo vào đây
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>PNG or JPG </p>
                      </div>
                    </FileInput>
                  </FileUploader>
                </FormControl>
                <FormDescription>Chọn file để upload.</FormDescription>
              </FormItem>
            )}
          />
          <div className='flex gap-x-6 mt-4'>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className='h-40 w-40 bg-gray-200 animate-pulse border border-gray-300 rounded-2xl'
                  />
                ))
              : galleryPreview &&
                galleryPreview.map((url, index) => (
                  <div className='relative' key={index}>
                    <img
                      src={url}
                      alt={`product-${index}`}
                      className='h-40 object-contain border border-gray-200 rounded-2xl outline outline-offset-2 outline-gray-200'
                    />
                    <X
                      onClick={() => handleRemoveImage(index)}
                      className='absolute -top-1 -right-1 bg-white border rounded-full w-4 h-4 cursor-pointer'
                    />
                  </div>
                ))}
          </div>

          {/* Chi tiết chất liệu */}
          <FormField
            name='materialDetail'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='materialDetail' className='font-bold dark:text-gray-100'>
                  Chi tiết chất liệu
                </Label>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    id='materialDetail'
                    placeholder='Chi tiết chất liệu'
                    {...field}
                    className='dark:bg-gray-700 dark:text-gray-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end mt-6 space-x-3 pb-8'>
            <Button disabled={isLoading || loading} type='submit'>
              Thêm sản phẩm
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddProductForm
