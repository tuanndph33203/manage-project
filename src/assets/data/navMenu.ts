import { FolderGit2, Cloud, BarChart2, Bell } from 'lucide-react'

const navMenu = {
  user: {
    name: 'John Doe',
    avatar: 'https://github.com/eduardo-oliveira.png',
    email: 'Gj5fY@example.com'
  },
  navMain: [
    {
      title: 'Projects',
      url: '/dashboard',
      icon: FolderGit2
    },
    {
      title: 'Knowledge Base',
      url: '/knowledge',
      icon: Cloud
    },
    {
      title: 'Reports',
      url: '/report',
      icon: BarChart2
    },
    {
      title: 'Notifications',
      url: '/notification',
      icon: Bell
    }
  ]
}

export default navMenu
