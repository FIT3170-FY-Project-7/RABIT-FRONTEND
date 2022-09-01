import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRoutes } from 'react-router-dom'
import UserProvider from './content/Auth/UserProvider'
import routes from './router'
import ThemeProviderWrapper from './theme/ThemeProvider'

const queryClient = new QueryClient()

const App = () => {
    const content = useRoutes(routes)

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProviderWrapper>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline />
                    <UserProvider>{content}</UserProvider>
                </LocalizationProvider>
            </ThemeProviderWrapper>
        </QueryClientProvider>
    )
}

export default App
