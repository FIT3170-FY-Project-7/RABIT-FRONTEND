// React.Footer
import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router'
import { Navigate } from 'react-router-dom'
import RequireAuth from './components/ProtectedRoute'

// Types.
import type { ComponentProps, ComponentType } from 'react'

// Layout.
import BaseLayout from './layouts/BaseLayout'
import RabitLayout from './layouts/RabitLayout'

// Loader.
import SuspenseLoader from './components/SuspenseLoader'
import StaticPlotViewPage from './content/plots/StaticPlotViewPage'
const Loader = (Component: ComponentType) => (props: ComponentProps<typeof Component>) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  )

// Applications.
const UserProfile = Loader(lazy(() => import('./content/applications/Users/profile')))
const UserSettings = Loader(lazy(() => import('./content/applications/Users/settings')))
const Visualise = Loader(lazy(() => import('./content/visualise')))

// login, signup and password reset page
const Login = Loader(lazy(() => import('./content/pages/account/login')))
const Signup = Loader(lazy(() => import('./content/pages/account/signup')))
const ResetPassword = Loader(lazy(() => import('./content/pages/account/resetPassword')))

// Status pages.
// TODO: All of these should be converted to RABIT branding.
const Status404 = Loader(lazy(() => import('./content/pages/Status/Status404')))
const Status500 = Loader(lazy(() => import('./content/pages/Status/Status500')))
const StatusComingSoon = Loader(lazy(() => import('./content/pages/Status/ComingSoon')))
const StatusMaintenance = Loader(lazy(() => import('./content/pages/Status/Maintenance')))

// File Upload Page
const FileUpload = Loader(lazy(() => import('./content/pages/FileUpload')))
const UserPlots = Loader(lazy(() => import('./content/pages/UserPlots')))

// Routes.
const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      { index: true, element: <Navigate to='/plots' replace/> },
      // Uncomment below and comment the line above to enable login/signup URLs
      /*
      { index: true, element: <Login /> },
      { path: 'login', element: <Navigate to='/' replace /> },
      { path: 'signup', element: <Signup /> },
      { path: 'reset-password', element: <ResetPassword /> },
      */
      { path: '*', element: <Status404 /> }
    ]
  },
  // Uncomment below to enable profile URLs
  /*
  {
    path: 'management',
    element: <RabitLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='/upload' replace />
      },
      {
        path: 'profile',
        element: <RequireAuth />,
        children: [
          { path: '', element: <Navigate to='details' replace /> },
          { path: 'details', element: <UserProfile /> },
          { path: 'settings', element: <UserSettings /> }
        ]
      }
    ]
  },
  */
  {
    element: <RabitLayout />,
    children: [
      { path: 'visualise/:id', element: <Visualise /> },
      { path: 'visualise/view/:id', element: <StaticPlotViewPage /> },
      { path: 'upload', element: <FileUpload /> },
      { path: 'plots', element: <UserPlots /> },
      { path: '*', element: <Status404 /> }
    ]
  }
]

export default routes
