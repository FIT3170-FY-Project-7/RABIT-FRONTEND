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

function SignUp() {
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
                        <h1>Sign up</h1>
                    </Box>
                    <Box>
                        <form>
                            <div>
                                <TextField id="fullname" label="Your name" variant="outlined" margin="normal" required fullWidth />
                            </div>
                            <div>
                                <TextField id="username" label="Username" variant="outlined" margin="normal" required fullWidth />
                            </div>
                            <div>
                                <TextField id="emailAddress" label="Email address" type = "email" variant="outlined" margin="normal" required fullWidth />
                            </div>
                            <div>
                                <TextField id="password" label="Password" type="password" variant="outlined" margin="normal" required fullWidth />
                            </div>
                            <div>
                                <TextField id="confirmPassword" label="Confirm password" type="password" variant="outlined" margin="normal" required fullWidth />
                            </div>
                            <div>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <p>By signing up, you confirm you agree to the Terms of Service and Privacy Policy.</p>
                                </Box>
                            </div>
                            <div>
                              <Button variant="contained" type="submit" fullWidth>Sign up</Button>
                            </div>
                        </form>
                    </Box>
                    <Box sx={{ py: 1 }}>
                        <Link to="/login">
                            <Button variant="outlined" type="button" fullWidth>
                                Already have an account?
                            </Button>
                        </Link>
                    </Box>
                </Card>
            </Container>
        </OverviewWrapper>
    );
}

export default SignUp;
