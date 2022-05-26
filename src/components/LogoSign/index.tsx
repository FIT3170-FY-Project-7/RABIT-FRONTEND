import { Box, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

const LogoWrapper = styled(Link)(
    ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 234px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};`
)

function Logo() {
    return (
        <Tooltip title='RABIT' arrow>
            <LogoWrapper to='/'>
                <Box
                    component='img'
                    sx={{ height: '132px', width: '234px' }}
                    alt='RABIT Logo'
                    src='/public/static/images/logo/rabit-purple-full.png'
                />
            </LogoWrapper>
        </Tooltip>
    )
}

export default Logo
