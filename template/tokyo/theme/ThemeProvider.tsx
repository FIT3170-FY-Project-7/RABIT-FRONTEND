import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StyledEngineProvider  } from '@mui/styled-engine';

export const ThemeContext = React.createContext((_themeName: string): void => {});

const ThemeProviderWrapper: React.FC = (props) => {
    const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
    const [themeName, _setThemeName] = useState(curThemeName);
    const theme = themeCreator(themeName);
    const setThemeName = (themeName: string): void => {
        localStorage.setItem('appTheme', themeName);
        _setThemeName(themeName);
    };

    return (
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={setThemeName}>
                <ThemeProvider theme={theme}>{props.children}</ThemeProvider >
            </ThemeContext.Provider>
        </StyledEngineProvider >
    );
};

export default ThemeProviderWrapper;
