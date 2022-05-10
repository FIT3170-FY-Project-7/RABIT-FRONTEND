import {
    Box,
    Container,
    Card,
    TextField,
    Button,
    Grid,
    Tooltip,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

import { styled } from "@mui/material/styles";
import Logo from "../../components/LogoSign";
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { ButtonGroup } from "@mui/material";
import {
    RememberMe,
    RememberMeOutlined,
    VisibilityOffOutlined,
    VisibilityOutlined,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";

const Login = () => {
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
                <title>RABIT | Login</title>
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
                            <Typography variant="h1">Welcome Back!</Typography>
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
                                Log in with Google
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontStyle: "italic" }}
                                >
                                    Or enter your credentials below to continue.
                                </Typography>
                            </Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <LoginForm />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup fullWidth>
                                {/* TODO: redirect to password reset page*/}
                                <Button
                                    component={Link}
                                    to="/reset-password"
                                    variant="outlined"
                                    type="button"
                                    fullWidth
                                >
                                    Forgot password?
                                </Button>
                                <Button
                                    component={Link}
                                    to="/signup"
                                    variant="outlined"
                                    type="button"
                                    fullWidth
                                >
                                    Looking for signup?
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
};

/**
 * Component for the login form.
 */
const LoginForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const [usernameIR, passwordIR] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(usernameIR.current?.value || "");
        setPassword(passwordIR.current?.value || "");
    };

    // Validation methods.
    const validateUsername = () => {
        console.log(username);
        setUsernameError(username.length < 3);
    };
    const validatePassword = () => setPasswordError(password.length < 3);

    // Prevents useEffect from running login code on init.
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true));

    // Processes new login data from the form.
    useEffect(() => {
        if (!ready) return;

        // Update the error state of the inputs.
        validateUsername();
        validatePassword();

        // Don't continue to login logic if there are errors.
        if (usernameError || passwordError) return;

        /* TODO: Actual login code. */
    }, [username, password]);

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
                    inputRef={usernameIR}
                    error={usernameError}
                    label="Username"
                    placeholder="Enter username..."
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
                    placeholder="Enter password..."
                    variant="outlined"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sx={{ display: "inline-flex" }}>
                <Button variant="contained" type="submit" fullWidth>
                    Log in
                </Button>
                <Tooltip title="Remember me" placement="right" arrow>
                    <IconButton
                        onClick={() => setRememberMe(!rememberMe)}
                        sx={{ ml: 1 }}
                    >
                        {rememberMe ? <RememberMe /> : <RememberMeOutlined />}
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
};

export default Login;
