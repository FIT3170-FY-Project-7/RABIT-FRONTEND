import { Box, Container, Card, TextField, Checkbox, FormGroup, FormControlLabel, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from '../../components/LogoSign';
import { Link } from 'react-router-dom';


const OverviewWrapper = styled(Box)(
    () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
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
                    <Box>
                        <Button variant="contained" fullWidth>Log in with Google</Button>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <p>Or enter your credentials below to continue.</p>
                    </Box>
                    <Box>
                        <form>
                            <div>
                                <TextField id="username" label="Username" variant="outlined" margin="normal" required fullWidth />
                            </div>
                            <div>
                                <TextField id="password" label="Password" type="password" variant="outlined" margin="normal" required fullWidth />
                            </div>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Remember me"></FormControlLabel>
                            </FormGroup>
                            <Button variant="contained" type="submit" fullWidth>Log in</Button>
                        </form>
                    </Box>
                    <Box sx={{ py: 1 }}>
                        <Link to="/signup">
                            <Button variant="outlined" type="button" fullWidth>
                                Don't have an account?
                            </Button>
                        </Link>
                    </Box>
                </Card>
            </Container>
        </OverviewWrapper>
    );
}

export default Login;
