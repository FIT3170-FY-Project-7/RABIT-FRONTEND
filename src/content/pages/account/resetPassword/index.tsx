import { Box, Card, TextField, Button, Grid, Typography, Divider, ButtonGroup } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useState, FormEvent } from 'react'

import Logo from '../../../../components/LogoSign'
import { useNavigate } from 'react-router'
import { KeyboardReturnOutlined } from '@mui/icons-material'

function ResetPassword() {
    const navigate = useNavigate()

    return (
        <Grid
            container
            spacing={0}
            direction='column'
            overflow='hidden'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh' }}
        >
            <Helmet>
                <title>Reset Password | RABIT</title>
            </Helmet>
            <Grid item xs={12}>
                <Box display='flex' justifyContent='center' py={5} alignItems='center'>
                    <Logo />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ p: 8, mb: 8, borderRadius: 8, maxWidth: 'sm' }}>
                    <Grid container spacing={1} alignItems='center' justifyContent='center' textAlign='center'>
                        <Grid item xs={12}>
                            <Typography variant='h1'>Reset Password</Typography>
                            <Typography variant='subtitle1'>
                                Enter your email address below and you will be sent a password reset email.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResetPasswordForm />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup fullWidth>
                                <Button
                                    variant='outlined'
                                    type='button'
                                    onClick={() => navigate(-1)}
                                    endIcon={<KeyboardReturnOutlined />}
                                    fullWidth
                                >
                                    Go back...
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

function ResetPasswordForm() {
    // Email
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)

    // Submission Handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Update the error state of the inputs.
        let emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        setEmailError(emailInvalid)

        // Don't continue to password reset logic if there are errors.
        // We cannot check the useState values, as these will not be updated until the next render.
        if (emailInvalid) return

        // TODO: Password reset logic.

        // Prevent default form action (which would refresh the page).
        e.preventDefault()
    }

    return (
        <Grid
            container
            spacing={1}
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            component='form'
            onSubmit={handleSubmit}
        >
            <Grid item xs={12}>
                <TextField
                    onChange={e => setEmail(e.target.value)}
                    error={emailError}
                    type='email'
                    label='Email address'
                    variant='outlined'
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'inline-flex' }}>
                <Button variant='contained' type='submit' fullWidth>
                    Send email
                </Button>
            </Grid>
        </Grid>
    )
}

export default ResetPassword
