import { Box, Container, Card, TextField, Checkbox, FormGroup, FormControlLabel, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from '../../components/LogoSign';


const OverviewWrapper = styled(Box)(
    () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function ResetPassword() {
    return (
        <OverviewWrapper>
            <Helmet>
                <title>Sign up - RABIT</title>
            </Helmet>
            <Container maxWidth="sm">
                <Box display="flex" justifyContent="center" py={5} alignItems="center">
                    <Logo />
                </Box>
                <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <h1>Reset your password</h1>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <p>Enter your username below and we will send you an email to reset your password.</p>
                    </Box>
                    <Box>
                        <form>
                            <div>
                                <TextField id="username" label="Username" variant="outlined" margin="normal" required fullWidth />
                            </div>
                            <Button variant="contained" type="submit" fullWidth>Send email</Button>
                        </form>
                    </Box>
                </Card>
            </Container>
        </OverviewWrapper>
    );
}

export default ResetPassword;
