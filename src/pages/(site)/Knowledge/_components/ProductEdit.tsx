/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProductService } from '@/services/product'
import { useState, useEffect } from 'react'
import { ProductFormData } from '@/interface/product'
import { toast } from '@/hooks/use-toast'
import { useParams } from 'react-router-dom'
import AddVariants from './Variants'
import { uploadFileCloudinary } from '@/utils/upload-cloudinary'
import { Skeleton } from '@/components/ui/skeleton'
import { CloudUpload, X } from 'lucide-react'
import { FileInput, FileUploader } from '@/components/ui/file-upload'
import { useSingleProductQuery } from '@/hooks/querys/useProductQuery'
import { useMultipleCategoryQuery } from '@/hooks/querys/useCategoryQuery'
import { useMultipleMaterialQuery } from '@/hooks/querys/useMaterialQuery'
import { ProductItem } from '@/interface/productItem'
import { ProductItemService } from '@/services/productItem'
import { Textarea } from '@/components/ui/textarea'

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' }),
  category: z.string().min(1, { message: 'Vui lòng chọn danh mục.' }),
  description: z.string().optional(),
  images: z.array(z.string()).min(1, { message: 'Phải có ít nhất một ảnh sản phẩm.' }),
  material: z.string().optional(),
  materialDetail: z.string().optional(),
  status: z.enum(['creating', 'available', 'disable'], {
    required_error: 'Vui lòng chọn trạng thái sản phẩm.'
  })
})

const EditProductForm = () => {
  const { data: categories } = useMultipleCategoryQuery()
  const { data: materials } = useMultipleMaterialQuery()
  const { id } = useParams<{ id: string }>()
  const { data: productData } = useSingleProductQuery(id || ``)
  const [files, setFiles] = useState<File[] | null>(null)
  const [galleryPreview, setGalleryPreview] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true
  }
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
  useEffect(() => {
    if (productData) {
      const product = productData?.data?.data
      const material = product?.material?._id
      const category = product?.category?._id
      const formData = {
        ...product,
        material,
        category
      }
      form.reset(formData)
    }
  }, [productData, form])
  const handleSubmit = async (data: ProductFormData) => {
    const finalImages = files && files.length > 0 ? files : productData?.data?.data.images
    try {
      if (id) {
        const productItems = await ProductItemService.getByProductId(id)
        const allDisabled = productItems?.data?.data.every((item: ProductItem) => item.status === 'deleted')
        if (
          (data.status !== 'creating' && productItems?.data?.data.length === 0) ||
          (data.status !== 'creating' && allDisabled)
        ) {
          toast({
            title: 'Đã xảy ra lỗi',
            description: `Không thể chuyển trạng thái khi chưa có biến thể sản phẩm nào !`,
            variant: 'destructive',
            duration: 3000
          })
          return
        }
        await ProductService.update(id, { ...data, images: finalImages })
        toast({
          title: 'Cập nhật thành công',
          description: `Sản phẩm ${data.name} đã được cập nhật thành công.`,
          variant: 'success',
          duration: 3000
        })
      }
    } catch (error: any) {
      toast({
        title: 'Lỗi cập nhật sản phẩm',
        description: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
        variant: 'destructive',
        duration: 3000
      })
      console.error('Lỗi khi cập nhật sản phẩm:', error)
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
  if (!productData) {
    return <div>Không tồn tại sản phẩm có ID tương ứng</div>
  }
  return (
    <div className='bg-[#F5F6FA] dark:bg-[#0f172a]'>
      <div className='bg-[#ffffff] dark:bg-[#1f2937] rounded-md '>
        <Form {...form}>
          <div className='font-bold text-2xl space-y-4 px-4 md:px-10 p-5 dark:text-gray-100'>Cập nhật sản phẩm</div>
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
                      disabled={isLoading}
                      id='name'
                      placeholder='Tên sản phẩm'
                      {...field}
                      aria-required='true'
                      className='dark:bg-gray-700 dark:text-gray-100 border rounded-md p-1 min-w-[150px]'
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
                      >
                        <option value='creating'>Chưa bán</option>
                        <option value='available'>Đang bán</option>
                        <option value='disable'>Đã ngừng bán</option>
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
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className='h-40 w-40 bg-gray-200 animate-pulse border border-gray-300 rounded-2xl'
                  />
                ))
              ) : galleryPreview.length > 0 ? (
                galleryPreview.map((url, index) => (
                  <div className='relative' key={index}>
                    <img
                      src={typeof url === 'string' ? url : URL.createObjectURL(url)}
                      alt={`product-${index}`}
                      className='h-40 object-contain border border-gray-200 rounded-2xl outline outline-offset-2 outline-gray-200'
                    />
                    <X
                      onClick={() => handleRemoveImage(index)}
                      className='absolute -top-1 -right-1 bg-white border rounded-full w-4 h-4 cursor-pointer'
                    />
                  </div>
                ))
              ) : productData?.data?.data.images && productData?.data?.data.images.length > 0 ? (
                productData?.data?.data.images.map((url, index) => (
                  <div className='relative' key={index}>
                    <img
                      src={typeof url === 'string' ? url : URL.createObjectURL(url)}
                      alt={`product-${index}`}
                      className='h-40 object-contain border border-gray-200 rounded-2xl outline outline-offset-2 outline-gray-200'
                    />
                  </div>
                ))
              ) : (
                <p className='text-gray-500 dark:text-gray-400'>Không có hình ảnh nào.</p>
              )}
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
                Cập nhật sản phẩm
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {id && <AddVariants productId={id} />}
    </div>
  )
}

export default EditProductForm
