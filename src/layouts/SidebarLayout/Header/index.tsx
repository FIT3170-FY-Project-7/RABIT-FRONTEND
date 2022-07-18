import { useContext } from 'react'

import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone'
import { Box, Hidden, IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SidebarContext } from '../../../contexts/SidebarContext'

import Logo from '../../../components/Logo'
import HeaderButtons from './Buttons'
import HeaderMenu from './Menu'
import HeaderUserbox from './Userbox'

const HeaderWrapper = styled(Box)(
    ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }`
)

function Header() {
    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext)

    return (
        <HeaderWrapper display='flex' alignItems='center'>
            <Box display='flex' alignItems='center'>
                <Hidden lgUp>
                    <Logo />
                </Hidden>
                <Hidden mdDown>
                    <HeaderMenu />
                </Hidden>
            </Box>
            <Box display='flex' alignItems='center'>
                <HeaderButtons />
                <HeaderUserbox />
                <Hidden lgUp>
                    <Tooltip arrow title='Toggle Menu'>
                        <IconButton color='primary' onClick={toggleSidebar}>
                            {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
                        </IconButton>
                    </Tooltip>
                </Hidden>
            </Box>
        </HeaderWrapper>
    )
}

export default Header
