// React.Footer
import { Suspense, lazy } from 'react'
import { Navigate       } from 'react-router-dom'
import { RouteObject    } from 'react-router'

// Types.
import type { ComponentProps, ComponentType } from 'react'

// Layout.
import SidebarLayout from './layouts/SidebarLayout'
import BaseLayout    from './layouts/BaseLayout'

// Loader.
import SuspenseLoader from './components/SuspenseLoader'
const Loader = (Component: ComponentType) => (props: ComponentProps<typeof Component>) => (
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
)

// Applications.
const UserProfile  = Loader(lazy(() => import('./content/applications/Users/profile' )))
const UserSettings = Loader(lazy(() => import('./content/applications/Users/settings')))

// Overview.
const Overview = Loader(lazy(() => import('./content/overview')))

// Status pages.
// TODO: All of these should be converted to RABIT branding.
const Status404         = Loader(lazy(() => import('./content/pages/Status/Status404'  )))
const Status500         = Loader(lazy(() => import('./content/pages/Status/Status500'  )))
const StatusComingSoon  = Loader(lazy(() => import('./content/pages/Status/ComingSoon' )))
const StatusMaintenance = Loader(lazy(() => import('./content/pages/Status/Maintenance')))

// Routes.
const routes: RouteObject[] = [
    {
        element  : <BaseLayout />,
        children : [
            // TODO: Convert to login screen.
            { index : true      , element : <Overview />                },
            { path  : 'overview', element : <Navigate to="/" replace /> },
            { path  : '*'       , element : <Status404 />               },
        ]
    },
    {
        path     : 'management'     ,
        element  : <SidebarLayout />,
        children : [
            { path: '', element: <Navigate to="/management/profile" replace /> },
            {
                path     : 'profile',
                children : [
                    { path : ''        , element : <Navigate to="details" replace /> },
                    { path : 'details' , element : <UserProfile />                   },
                    { path : 'settings', element : <UserSettings />                  },
                ]
            }
        ]
    }
]

export default routes
