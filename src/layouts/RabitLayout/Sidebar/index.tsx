import { Box, Button, Hidden, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
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

        @media (min-width: ${theme.breakpoints.values.xs}px) {
            position                    : fixed;
            z-index                     : 10;
        }

        @media (min-width: ${theme.breakpoints.values.sm}px) {
            position                    : fixed;
            z-index                     : 10;
        }

        @media (min-width: ${theme.breakpoints.values.md}px) {
            position                    : fixed;
            z-index                     : 10;
        }

        @media (min-width: ${theme.breakpoints.values.lg}px) {
            position                    : fixed;
            z-index                     : 10;
        }

        @media (min-width: ${theme.breakpoints.values.xl}px) {
            position                    : fixed;
            z-index                     : 10;
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
    const navigate = useNavigate()
    return (
        <SidebarWrapper>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                <TopSection>
                    {/* rabit logo is created here */}
                    <Logo />
                </TopSection>

                <SidebarMenu /> {/* sidebar menu is created here */}

                <Box sx={{ marginTop: 'auto', marginBottom: '1rem' }}>
                    {/* displays the user profile */}
                    <HeaderUserbox />
                </Box>
            </Box>
        </SidebarWrapper>
    )
}

export default Sidebar
