import { Box, Container, Card, TextField, Checkbox, FormGroup, FormControlLabel, Button, Grid } from '@mui/material';
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
                <Card sx={{ p: 8, mb: 8, borderRadius: 8 }}>
                    <Grid container spacing={1} alignItems="center" justifyContent="center" textAlign="center">
                        <Grid item xs={12}>
                            <h1>Welcome back</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth>Log in with Google</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <p>Or enter your credentials below to continue.</p>
                        </Grid>
                        <Grid item xs={12}>
                            <LoginForm />
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/reset-password"> {/* TODO: redirect to password reset page*/}
                                <Button variant="outlined" type="button" fullWidth>
                                    Forgot password?
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/signup">
                                <Button variant="outlined" type="button" fullWidth>
                                    Don't have an account?
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </OverviewWrapper>
    );
}

/**
 * Component for the login form.
 */
function LoginForm() {
    return (
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
    );
}

export default Login;
