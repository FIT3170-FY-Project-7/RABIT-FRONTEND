import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useRoutes } from 'react-router-dom'
import routes from './router'

import { CssBaseline } from '@mui/material'
import ThemeProviderWrapper from './theme/ThemeProvider'
import React, {useState} from 'react'
import {UserContext} from './content/Auth/UserContext'

const App = () => {
    const content = useRoutes(routes)
    const [JWT, setJWT] = useState(null)

    return (
        <ThemeProviderWrapper>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                <UserContext.Provider value = {{JWT,setJWT}}>
                    {content}
                </UserContext.Provider>
            </LocalizationProvider>
        </ThemeProviderWrapper>
    )
}

export default App
