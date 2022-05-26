import { Box, Container, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import Logo from '../../../../components/LogoSign'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import { styled } from '@mui/material/styles'

import LogoMaintenance from 'assets/images/status/maintenance.svg'

const MainContent = styled(Box)(
    () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;`
)

function StatusMaintenance() {
    return (
        <>
            <Helmet>
                <title>Status - Maintenance</title>
            </Helmet>
            <MainContent>
                <Container maxWidth='md'>
                    <Logo />
                    <Box textAlign='center'>
                        <Container maxWidth='xs'>
                            <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
                                The site is currently down for maintenance
                            </Typography>
                            <Typography variant='h3' color='text.secondary' fontWeight='normal' sx={{ mb: 4 }}>
                                We apologize for any inconveniences caused
                            </Typography>
                        </Container>
                        <img alt='Maintenance' height={250} src={LogoMaintenance} />
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Box>
                            <Typography component='span' variant='subtitle1'>
                                Phone:{' '}
                            </Typography>
                            <Typography component='span' variant='subtitle1' color='text.primary'>
                                + 00 1 888 555 444
                            </Typography>
                        </Box>
                        <Box>
                            <Tooltip arrow placement='top' title='Facebook'>
                                <IconButton color='primary'>
                                    <FacebookIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement='top' title='Twitter'>
                                <IconButton color='primary'>
                                    <TwitterIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement='top' title='Instagram'>
                                <IconButton color='primary'>
                                    <InstagramIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Container>
            </MainContent>
        </>
    )
}

export default StatusMaintenance
