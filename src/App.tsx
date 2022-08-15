import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useRoutes } from 'react-router-dom'
import routes from './router'

import { CssBaseline } from '@mui/material'
import ThemeProviderWrapper from './theme/ThemeProvider'

const App = () => {
    const content = useRoutes(routes)

    return (
        <ThemeProviderWrapper>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {content}
            </LocalizationProvider>
        </ThemeProviderWrapper>
    )
}

export default App
