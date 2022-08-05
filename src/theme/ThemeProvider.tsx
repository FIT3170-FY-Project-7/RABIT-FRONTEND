import { ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/styled-engine'
import React, { ComponentProps, useState } from 'react'
import { themeCreator } from './base'

export const ThemeContext = React.createContext((_themeName: string): void => {})

const ThemeProviderWrapper: React.FC = (props: ComponentProps<any>) => {
    const curThemeName = localStorage.getItem('appTheme') || 'NebulaFighterTheme'
    const [themeName, _setThemeName] = useState(curThemeName)
    const theme = themeCreator(themeName)
    const setThemeName = (themeName: string): void => {
        localStorage.setItem('appTheme', themeName)
        _setThemeName(themeName)
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={setThemeName}>
                <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
            </ThemeContext.Provider>
        </StyledEngineProvider>
    )
}

export default ThemeProviderWrapper
