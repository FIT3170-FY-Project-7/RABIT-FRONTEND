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

// A styled div for text inside the login page
const ContentDiv = styled(Box)(
    () => `
    display: flex;
    justify-content: center;
    align-items: center;
    `
);

// div style for form fields
const FormField = styled(Box)(
    () => `
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    padding-bottom
    `
);

function Login() {
    return (
        <OverviewWrapper>
            <Helmet>
                <title>Log in - RABIT</title>
            </Helmet>
            <Container maxWidth="sm">
                <Box display="flex" justifyContent="center" py={5} alignItems="center">
                    <Logo />
                </Box>
                <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <h1>Welcome back</h1>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <p>Enter your credentials to continue.</p>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <form>
                            <div>
                                <TextField id="username" label="Username" variant="outlined" margin="normal" required />
                            </div>
                            <div>
                                <TextField id="password" label="Password" type="password" variant="outlined" margin="normal" required />
                            </div>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Remember me"></FormControlLabel>
                            </FormGroup>
                            <Button variant="contained" type="submit">Log in</Button>
                        </form>
                    </Box>
                </Card>
            </Container>
        </OverviewWrapper>
    );
}

export default Login;
