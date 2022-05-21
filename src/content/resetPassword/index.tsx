import { Box, Card, TextField, Button, Grid, Divider, Typography, ButtonGroup, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Helmet } from 'react-helmet-async';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/LogoSign';


function ResetPassword() {
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
                <title>reset password - RABIT</title>
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
                            <Typography variant="h1">Reset password</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            Enter your email below and we will send you an email to reset your password.
                        </Grid>
                        <Grid item xs={12}>
                            <ResetPasswordForm/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}

function ResetPasswordForm() {
    const emailIR =  useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmail(emailIR.current?.value || "");
    }
    const validateEmail = () => {
        // TODO: proper email validation
        setEmailError(email.length == 0);
    }

        // Prevents useEffect from running login code on init.
        const [ready, setReady] = useState(false);
        useEffect(() => setReady(true));
    
        // Processes new login data from the form.
        useEffect(() => {
            if (!ready) return;
    
            // Update the error state of the inputs.
            validateEmail();
    
            // Don't continue to login logic if there are errors.
            if (emailError){ 
                return;
            }
    
            /* TODO: Actual reset code. */
        }, [email]);

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
                inputRef={emailIR}
                error={emailError}
                type="email"
                label="Email address"
                variant="outlined"
                required
                fullWidth
            />
        </Grid>
        <Grid item xs={12} sx={{ display: "inline-flex" }}>
                <Button variant="contained" type="submit" fullWidth>
                    Send email
                </Button>
        </Grid>
    </Grid>
    );
}

export default ResetPassword;
