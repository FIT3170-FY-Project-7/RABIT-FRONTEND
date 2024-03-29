import { RememberMe, RememberMeOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography
} from '@mui/material'
import GoogleLogo from 'assets/images/logo/google.svg'
import { FormEvent, useEffect, useState } from 'react'
import { useNotify } from 'react-admin'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../../components/LogoSign'
import { useUserContext } from '../../../Auth/UserContext'

const Login = () => {
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
                <title>Login | RABIT</title>
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
                            <Typography variant='h1'>Welcome Back!</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ pt: 1, pb: 1 }}
                                variant='outlined'
                                startIcon={<img src={GoogleLogo} />}
                                fullWidth
                            >
                                Log in with Google
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography variant='subtitle1' sx={{ fontStyle: 'italic' }}>
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
                                <Button
                                    component={Link}
                                    to='/reset-password'
                                    variant='outlined'
                                    type='button'
                                    fullWidth
                                >
                                    Forgot password?
                                </Button>
                                <Button component={Link} to='/signup' variant='outlined' type='button' fullWidth>
                                    Don't have an account?
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

/**
 * Component for the login form.
 */
const LoginForm = () => {
    const { login, enforceLogin } = useUserContext()
    const navigate = useNavigate()
    const notify = useNotify()

    //If jwt alrdy in local storage, render profile page
    if (enforceLogin()){
        useEffect(() => {
            navigate('/upload')
    })
    }

    // Password Visibility
    const [passwordVisible, setPasswordVisible] = useState(false)

    // Remember Me
    const [rememberMe, setRememberMe] = useState(false)

    // Username (which is actually the inputted email ffs)
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(false)

    // Password
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)

    // Submission Handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Update the error state of the inputs.
        let usernameInvalid = username.length < 3
        let passwordInvalid = password.length < 3
        setUsernameError(usernameInvalid)
        setPasswordError(passwordInvalid)

        // Don't continue to login logic if there are errors.
        // We cannot check the useState values, as these will not be updated until the next render.
        if (usernameInvalid || passwordInvalid) return

        // TODO: Login logic.
        // test
        // Prevent default form action (which would refresh the page).
        e.preventDefault()

        try {
            login(username, password)
        } catch (err) {
            notify(err)
        }
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
                    onChange={e => setUsername(e.target.value)}
                    error={usernameError}
                    label='Email'
                    placeholder='Enter email...'
                    variant='outlined'
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={e => setPassword(e.target.value)}
                    error={passwordError}
                    label='Password'
                    type={passwordVisible ? 'text' : 'password'}
                    InputProps={{
                        sx: { pr: 0 },
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    placeholder='Enter password...'
                    variant='outlined'
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'inline-flex' }}>
                <Button variant='contained' type='submit' fullWidth>
                    Log in
                </Button>
                <Tooltip title='Remember me' placement='right' arrow>
                    <IconButton onClick={() => setRememberMe(!rememberMe)} sx={{ ml: 1 }}>
                        {rememberMe ? <RememberMe /> : <RememberMeOutlined />}
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}
export default Login
