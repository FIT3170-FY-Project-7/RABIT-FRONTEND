import UploadIcon from '@mui/icons-material/Upload'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { ReactNode } from 'react'

export interface MenuItem {
    link?: string
    icon?: ReactNode
    badge?: string
    items?: MenuItem[]
    name: string
}

export interface MenuItems {
    items: MenuItem[]
    heading: string
}

const menuItems: MenuItems[] = [
    {
        heading: 'Pages',
        items: [
            {
                name: 'Upload',
                link: '/upload',
                icon: UploadIcon
            },
            {
                name: 'Past Uploads',
                link: '/history',
                icon: AccessTimeIcon
            }
        ]
    }
]

export default menuItems
