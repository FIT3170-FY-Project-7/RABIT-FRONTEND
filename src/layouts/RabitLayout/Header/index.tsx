import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import DataTitle from './Search'
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
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }`
)

const UserBoxWrapper = styled(Box)(({ theme }) => `margin: ${theme.spacing(0, 0, 0, 2)};`)

function Header() {
    return <div />
}

export default Header
