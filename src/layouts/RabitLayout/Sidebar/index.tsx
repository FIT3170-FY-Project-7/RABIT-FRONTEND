import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone'
import { Box, Button, Hidden, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { NavLink as RouterLink } from 'react-router-dom'
import Logo from '../../../components/Logo'
import HeaderUserbox from '../Header/Userbox'
import SidebarMenu from './SidebarMenu'

const Input = styled('input')({
    display: 'none'
})

const SidebarWrapper = styled(Box)(
    ({ theme }) => `
        width       : ${theme.sidebar.width};
        color       : ${theme.sidebar.textColor};
        background  : ${theme.sidebar.background};
        box-shadow  : ${theme.sidebar.boxShadow};
        height      : 100%;
                
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            position                    : fixed;
            z-index                     : 10;
            border-top-right-radius     : ${theme.general.borderRadius};
            border-bottom-right-radius  : ${theme.general.borderRadius};
        }
    `
)

const TopSection = styled(Box)(
    ({ theme }) => `
        display        : flex;
        height         : 88px;
        align-items    : center;
        margin         : 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom  : ${theme.sidebar.dividerBg} solid 1px;
    `
)

function Sidebar() {
    return (
        <Hidden lgDown>
            <SidebarWrapper>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <TopSection>
                        <Logo />
                    </TopSection>
                    <SidebarMenu />
                    <Box sx={{ marginTop: 'auto', marginBottom: '1rem' }}>
                        <HeaderUserbox />
                    </Box>
                </Box>
            </SidebarWrapper>
        </Hidden>
    )
}

export default Sidebar
