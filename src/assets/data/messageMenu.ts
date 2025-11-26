import { IMessageMenu } from '@/interface/message'
import { Mail, MessageCircleQuestion, Pencil, Send, Star } from 'lucide-react'

const messageMenup: IMessageMenu = {
  buttons: [
    { icon: Mail, path: '/conversation', text: 'Hộp thư chung', count: 123 },
    { icon: Star, path: '/conversation', text: 'Hộp thư cá nhân', count: 123 },
    { icon: Star, path: '/conversation?filter=star', text: 'Đã đánh dấu', count: 123 },
    { icon: Send, path: '/conversation?filter=send', text: 'service', count: 123 },
    { icon: Pencil, path: '/conversation?filter=draft', text: 'feedback', count: 123 },
    { icon: MessageCircleQuestion, path: '/conversation?filter=order', text: 'Quan trọng', count: 123 }
  ]
}

export default messageMenup
