import { useRoutes } from 'react-router-dom'
import routes from './router'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import ThemeProviderWrapper from './theme/ThemeProvider'
import { CssBaseline } from '@mui/material'
import PlotsPage from './content/plots/PlotsPage'

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
