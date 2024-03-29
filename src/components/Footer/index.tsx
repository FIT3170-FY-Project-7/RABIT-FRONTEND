import { Box, Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const FooterWrapper = styled(Box)(
    ({ theme }) => `
        border-radius: 0;`
)

function Footer() {
    return (
        <FooterWrapper>
            <Box
                pt={3}
                display={{ xs: 'block', md: 'flex' }}
                alignItems='center'
                textAlign={{ xs: 'center', md: 'left' }}
                justifyContent='space-between'
            >
                <Box>
                    <Typography variant='subtitle1'>RABIT (Robust Analytical Bayesian Inference Tool)</Typography>
                </Box>
                <Typography sx={{ pt: { xs: 2, md: 0 } }} variant='subtitle1'>
                    Crafted by{' '}
                    <Link href='https://github.com/FIT3170-FY-Project-7' target='_blank' rel='noopener noreferrer'>
                        FIT3170-FY-Project-7
                    </Link>
                </Typography>
            </Box>
        </FooterWrapper>
    )
}

export default Footer
