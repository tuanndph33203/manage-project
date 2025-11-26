import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
  title?: string
  description?: string
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  if (!isOpen) return null

  return (
    <Modal title='Are you sure ?' description='This action cannot be undone.' isOpen={isOpen} onClose={onClose}>
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={loading} className='dark:bg-slate-100' variant={'outline'} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}
