import {
    Box,
    Card,
    TextField,
    Button,
    Grid,
    Divider,
    Typography,
    ButtonGroup,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../../components/LogoSign";

function SignUp() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            overflow="hidden"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh" }}
        >
            <Helmet>
                <title>Sign Up | RABIT</title>
            </Helmet>
            <Grid item xs={12}>
                <Box
                    display="flex"
                    justifyContent="center"
                    py={5}
                    alignItems="center"
                >
                    <Logo />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ p: 8, mb: 8, borderRadius: 8, maxWidth: "sm" }}>
                    <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h1">Create Account</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ pt: 1, pb: 1 }}
                                variant="outlined"
                                startIcon={
                                    <img src="/public/static/images/logo/google.svg" />
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
                            <Typography variant="subtitle1">
                                By signing up, you agree to the Terms of Service
                                and Privacy Policy.
                            </Typography>
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
    // Password Visibility
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Full Name
    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState(false);

    // Username
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);

    // Email Address
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    // Password
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    // Confirm Password
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    // Submission Handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Update the error state of the inputs.
        let fullNameInvalid = fullName.length == 0;
        let usernameInvalid = username.length < 3;
        let emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let passwordInvalid = password.length < 3;
        let confirmPasswordInvalid = password != confirmPassword;
        setFullNameError(fullNameInvalid);
        setUsernameError(usernameInvalid);
        setEmailError(emailInvalid);
        setPasswordError(passwordInvalid);
        setConfirmPasswordError(confirmPasswordInvalid);

        // Don't continue to signup logic if there are errors.
        // We cannot check the useState values, as these will not be updated until the next render.
        if (
            fullNameInvalid ||
            usernameInvalid ||
            emailInvalid ||
            passwordInvalid ||
            confirmPasswordInvalid
        )
            return;

        // TODO: Signup logic.

        // Prevent default form action (which would refresh the page).
        e.preventDefault();
    };

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
                    onChange={(e) => setFullName(e.target.value)}
                    error={fullNameError}
                    label="Your name"
                    variant="outlined"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameError}
                    label="Username"
                    variant="outlined"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
