import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Container, Grid, Hidden, Typography } from '@mui/material'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router'

const GridWrapper = styled(Grid)(
    ({ theme }) => `
    background: ${theme.colors.gradients.black1};`
)

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

const TypographyPrimary = styled(Typography)(
    ({ theme }) => `
      color: ${theme.colors.alpha.white[100]};`
)

const TypographySecondary = styled(Typography)(
    ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};`
)

function Status500() {
    const [pending, setPending] = useState(false)
    function handleClick() {
        setPending(true)
    }

    const navigate = useNavigate()

    return (
        <>
            <Helmet>
                <title>Status - 500</title>
            </Helmet>
            <MainContent>
                <Grid container sx={{ height: '100%' }} alignItems='stretch' spacing={0}>
                    <Grid xs={12} md={6} alignItems='center' display='flex' justifyContent='center' item>
                        <Container maxWidth='sm'>
                            <Box textAlign='center'>
                                <img alt='500' height={260} src='/public/static/images/status/500.svg' />
                                <Typography variant='h2' sx={{ my: 2 }}>
                                    There was an error, please try again later
                                </Typography>
                                <Typography variant='h4' color='text.secondary' fontWeight='normal' sx={{ mb: 4 }}>
                                    The server encountered an internal error and was not able to complete your request
                                </Typography>
                                <LoadingButton
                                    onClick={handleClick}
                                    loading={pending}
                                    variant='outlined'
                                    color='primary'
                                    startIcon={<RefreshTwoToneIcon />}
                                >
                                    Refresh view
                                </LoadingButton>
                                <Button onClick={() => navigate(-1)} variant='contained' sx={{ ml: 1 }}>
                                    Go back
                                </Button>
                            </Box>
                        </Container>
                    </Grid>
                    <Hidden mdDown>
                        <GridWrapper xs={12} md={6} alignItems='center' display='flex' justifyContent='center' item>
                            <Container maxWidth='sm'>
                                <Box textAlign='center'>
                                    <TypographyPrimary variant='h1' sx={{ my: 2 }}>
                                        Robust Analytical Bayesian Inference Tool
                                    </TypographyPrimary>
                                    <TypographySecondary variant='h4' fontWeight='normal' sx={{ mb: 4 }}>
                                        Data visualisation tool leveraging Bayes parameter estimation.
                                    </TypographySecondary>
                                    <Button href='/login' size='large' variant='contained'>
                                        Login
                                    </Button>
                                </Box>
                            </Container>
                        </GridWrapper>
                    </Hidden>
                </Grid>
            </MainContent>
        </>
    )
}

export default Status500
