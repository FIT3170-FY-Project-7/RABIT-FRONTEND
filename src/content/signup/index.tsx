import { Box, Card, TextField, Button, Grid, Divider, Typography, ButtonGroup, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Helmet } from 'react-helmet-async';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/LogoSign';


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
                <title>Sign up - RABIT</title>
            </Helmet>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" py={5} alignItems="center">
                    <Logo/>
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
                            By signing up, you agree to the Terms of Service and Privacy Policy.
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

function SignupForm() {
    // Enable the user to show password in password fields
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Form field bindings
    const [
        fullNameIR,
        usernameIR,
        emailIR,
        passwordIR,
        confirmPasswordIR,
    ] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    // Full name
    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState(false);

    // Username
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);

    // Email address
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    // Password
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    // Confirm password
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    // Submission handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFullName(fullNameIR.current?.value || "");
        setUsername(usernameIR.current?.value || "");
        setEmail(emailIR.current?.value || "");
        setPassword(passwordIR.current?.value || "");
        setConfirmPassword(confirmPasswordIR.current?.value || "");
    };

    // Validation methods
    const validateFullName = () => {
        setFullNameError(fullName.length == 0);
    };
    const validateUsername = () => {
        setUsernameError(username.length < 3);
    };
    const validateEmail = () => {
        // TODO: proper email validation
        setEmailError(email.length == 0);
    }
    const validatePassword = () => {
        setPasswordError(password.length < 3);
    };
    const validateConfirmPassword = () => {
        setConfirmPasswordError(password != confirmPassword);
    }

    // Prevents useEffect from running login code on init.
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true));

    // Processes new login data from the form.
    useEffect(() => {
        if (!ready) return;

        // Update the error state of the inputs.
        validateFullName();
        validateUsername();
        validateEmail();
        validatePassword();
        validateConfirmPassword();

        // Don't continue to login logic if there are errors.
        if (fullNameError || usernameError || emailError || passwordError || confirmPasswordError){ 
            return;
        }

        /* TODO: Actual signup code. */
    }, [fullName, username, email, password, confirmPassword]);

    return (
        <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        component="form"
        onSubmit={handleSubmit}
    >
        <Grid item xs={12}>
            <TextField
                inputRef={fullNameIR}
                error={fullNameError}
                label="Your name"
                variant="outlined"
                required
                fullWidth
            />
        </Grid>
        <Grid item xs={12}>
        <TextField
            inputRef={usernameIR}
            error={usernameError}
            label="Username"
            variant="outlined"
            required
            fullWidth
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
            inputRef={emailIR}
            error={emailError}
            type="email"
            label="Email address"
            variant="outlined"
            required
            fullWidth
        />
        </Grid>
        <Grid item xs={12}>
            <TextField
                inputRef={passwordIR}
                error={passwordError}
                label="Password"
                type={passwordVisible ? "text" : "password"}
                InputProps={{
                    sx: { pr: 0 },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                }
                            >
                                {passwordVisible ? (
                                    <VisibilityOutlined />
                                ) : (
                                    <VisibilityOffOutlined />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                required
                fullWidth
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                    inputRef={confirmPasswordIR}
                    error={confirmPasswordError}
                    label="Confirm password"
                    type={passwordVisible ? "text" : "password"}
                    InputProps={{
                        sx: { pr: 0 },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setPasswordVisible(!passwordVisible)
                                    }
                                >
                                    {passwordVisible ? (
                                        <VisibilityOutlined />
                                    ) : (
                                        <VisibilityOffOutlined />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    required
                    fullWidth
            />
        </Grid>
        <Grid item xs={12} sx={{ display: "inline-flex" }}>
                <Button variant="contained" type="submit" fullWidth>
                    Sign up by email
                </Button>
        </Grid>
    </Grid>
    );
}

export default SignUp;
