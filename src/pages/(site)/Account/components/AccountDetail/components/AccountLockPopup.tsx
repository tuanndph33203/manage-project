/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import useAccountMutation from '@/hooks/mutations/useAccountMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

interface AccountLockPopupProps {
  user: any
}

const formSchema = z.object({
  description: z.string()
})

export default function AccountLockPopup({ user }: AccountLockPopupProps) {
  const { mutate: lockUser } = useAccountMutation({
    action: 'LOCK'
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      lockUser({
        id: user._id,
        data: {
          email: user.email,
          subject: 'Bạn đã bị khóa tài khoản',
          text: `
            <div class="container">
        <div class="title">Tài khoản của bạn đã bị khóa</div>
        <div class="description">Lí do: <span id="reason">${values.description}</span></div>
        <p>Vui lòng <a href="mailto:tuanndph33203@fpt.edu.vn" class="contact">liên hệ quản trị viên</a> để biết thêm chi tiết.</p>
    </div>
          `
        }
      })
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='outline' color='yellow' className='mr-2'>
          <Lock size={18} className='mr-2 text-yellow-500' />
          Khoá tài khoản
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn chắc chứ</DialogTitle>
          <DialogDescription>
            Khoá tài khoản sẽ ngăn người dùng này truy cập vào hệ thống. Bạn có chắc chắn muốn tiếp tục?
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 py-6'>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lí do khoá tài khoản</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Lí do khoá...' className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>Bạn có thể nhập lí do ở đây</FormDescription>
                  </FormItem>
                )}
              />
              <Button type='submit'>Xác nhận</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
