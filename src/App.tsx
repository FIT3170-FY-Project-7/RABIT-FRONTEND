import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useRoutes } from 'react-router-dom'
import UserProvider from './content/Auth/UserProvider'
import routes from './router'
import ThemeProviderWrapper from './theme/ThemeProvider'
const App = () => {
    const content = useRoutes(routes)

    return (
        <ThemeProviderWrapper>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                <UserProvider>{content}</UserProvider>
            </LocalizationProvider>
        </ThemeProviderWrapper>
    )
}

export default App
