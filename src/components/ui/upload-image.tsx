import { FileInput, FileUploader } from '@/components/ui/file-upload'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { uploadFileCloudinary } from '@/utils/upload-cloudinary'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from './button'
import { Label } from './label'

const formSchema = z.object({
  images: z.array(z.string()).max(5).optional()
})

export default function UploadImage() {
  const [files, setFiles] = useState<File[] | null>(null)
  const [galleryPreview, setGalleryPreview] = useState<string[]>([])

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
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
    const urls = await Promise.all(Array.from(images).map(uploadFileCloudinary))
    setFiles(urls)
    setGalleryPreview(Array.from(images).map((file) => URL.createObjectURL(file)))
  }

  const handleRemoveImage = (index: number) => {
    if (!galleryPreview || !files) return

    const updatedGalleryPreview = galleryPreview.filter((_, i) => i !== index)
    setGalleryPreview(updatedGalleryPreview)

    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <div className='flex gap-x-6 mt-4'>
                    {galleryPreview &&
                      galleryPreview.length > 0 &&
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
                </FileUploader>
              </FormControl>
              <FormDescription>Chọn file để upload.</FormDescription>
              <FormMessage>{form.formState.errors.images?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button className='mt-2'>Save</Button>
      </form>
    </Form>
  )
}
