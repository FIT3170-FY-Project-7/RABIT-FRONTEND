import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { useRoutes } from 'react-router-dom'
import ErrorFallback from './components/ErrorFallback'
import UserProvider from './content/Auth/UserProvider'
import routes from './router'
import ThemeProviderWrapper from './theme/ThemeProvider'

const queryClient = new QueryClient()

const App = () => {
  const content = useRoutes(routes)

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <QueryClientProvider client={queryClient}>
        <ThemeProviderWrapper>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <UserProvider>{content}</UserProvider>
          </LocalizationProvider>
        </ThemeProviderWrapper>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
