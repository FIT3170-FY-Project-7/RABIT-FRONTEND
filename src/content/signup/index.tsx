import { Box, Container, Card, TextField, Checkbox, FormGroup, FormControlLabel, Button, Grid, Divider, Typography, ButtonGroup } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from '../../components/LogoSign';
import { Link } from 'react-router-dom';


function SignUp() {
    return (
        <Grid 
        container
        spacing={0}
        direction="column"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}>
            <Helmet>
                Sign up - RABIT
            </Helmet>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" py={5} alignItems="center">
                    <Logo></Logo>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ p: 8, mb: 8, borderRadius: 8, maxWidth: "sm" }}>
                    <Grid container spacing={1} alignItems="center" justifyContent="center" textAlign="center">
                        <Grid item xs={12}>
                        <Typography variant="h1">Create an account</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ pt: 1, pb: 1 }}
                                variant="outlined"
                                startIcon={
                                    <img src="/static/images/logo/google.svg" />
                                }
                                fullWidth
                            >
                                Sign up with Google
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontStyle: "italic" }}
                                >
                                    Or enter your details below to continue.
                                </Typography>
                            </Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <SignupForm />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup fullWidth>
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    type="button"
                                    fullWidth
                                >
                                    Already have an account?
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Card>
            </Grid> 
        </Grid>
    );
}

const SignupForm = () => {
    // TODO
    return (
        <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        component="form"
        //onSubmit={handleSubmit}
    >
        // TODO signup form
    </Grid>
    );
}

export default SignUp;
