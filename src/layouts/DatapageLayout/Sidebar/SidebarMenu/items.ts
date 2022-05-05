import { ReactNode } from 'react';

import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Home',
        link: '/overview',
        icon: HomeIcon
      },
      {
        name: 'Explore',
        icon: ExploreIcon,
        link: '/management/profile',
        items: [
          {
            name: 'Plots',
            link: '/management/profile/details'
          },
          {
            name: 'Metadata',
            link: '/management/profile/settings'
          }
        ]
      }
    ]
  }
  
];

export default menuItems;
