import { ReactNode } from 'react';

import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import TimelineIcon from '@mui/icons-material/Timeline';

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
        name: 'Visualise',
        link: '/Visualise',
        icon: TimelineIcon
      },
      {
        name: 'Discussion',
        link: '/Discussion',
        icon: ForumIcon,
        badge: '1'
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
