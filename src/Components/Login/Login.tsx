"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { LoginSignIn } from './LoginSignIn';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import Image from 'next/image';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
interface LogResponse {
    data: {
        success: boolean;
        message: string;
        token: string;
    }
}

const userSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(18, "Password must be at most 18 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
    const [isSocialLoading, setIsSocialLoading] = React.useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
    
        const parsed = userSchema.safeParse({ email, password });
        if (!parsed.success) {
            const zodErrors: Record<string, string> = {};
            parsed.error.issues.forEach(issue => {
                const path = issue.path?.[0] as string;
                if (path) zodErrors[path] = issue.message;
            });
            setFormErrors(zodErrors);
            toast.error('Please correct the errors and try again.');
            return;
        }
        setFormErrors({});
        setIsLoading(true);
        try {
            const res = await LoginSignIn(parsed.data);
            if (res && res?.success) {
                localStorage.setItem('Token', res?.token);
                // Dispatch custom event to notify navbar of auth change
                window.dispatchEvent(new CustomEvent('authChange'));
                toast.success('Login successful!');
                router.push('/');
            } else {
                toast.error(res?.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsSocialLoading('google');
        try {
            // Google OAuth implementation
            // For now, we'll simulate the process
            toast.info('Google login coming soon!');
            // In a real implementation, you would:
            // 1. Initialize Google OAuth
            // 2. Get user info from Google
            // 3. Send to your backend for authentication
            // 4. Handle the response
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Google login failed. Please try again.');
        } finally {
            setIsSocialLoading(null);
        }
    };

    const handleFacebookLogin = async () => {
        setIsSocialLoading('facebook');
        try {
            // Facebook OAuth implementation
            // For now, we'll simulate the process
            toast.info('Facebook login coming soon!');
            // In a real implementation, you would:
            // 1. Initialize Facebook SDK
            // 2. Get user info from Facebook
            // 3. Send to your backend for authentication
            // 4. Handle the response
        } catch (error) {
            console.error('Facebook login error:', error);
            toast.error('Facebook login failed. Please try again.');
        } finally {
            setIsSocialLoading(null);
        }
    };

    const handleAppleLogin = async () => {
        setIsSocialLoading('apple');
        try {
            // Apple Sign-In implementation
            // For now, we'll simulate the process
            toast.info('Apple login coming soon!');
            // In a real implementation, you would:
            // 1. Initialize Apple Sign-In
            // 2. Get user info from Apple
            // 3. Send to your backend for authentication
            // 4. Handle the response
        } catch (error) {
            console.error('Apple login error:', error);
            toast.error('Apple login failed. Please try again.');
        } finally {
            setIsSocialLoading(null);
        }
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: (theme) => theme.palette.grey[100] }}>
            <Container component="main" maxWidth="sm">
            <CssBaseline />
                <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, background: '#fff' }}>
                    <Stack spacing={2} alignItems="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box textAlign="center">
                                <Typography component="h1" variant="h5" fontWeight={700}>
                                    Welcome back
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Please sign in to continue
                                </Typography>
                            </Box>
                        </Box>
                        <Card elevation={0} sx={{ width: '100%' }}>
                            <CardContent >
                                <Box component="form" onSubmit={handleSubmit} noValidate>
                                    {/* Email/Password Form */}
                                    <Stack spacing={3} sx={{ mb: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                                            label="Email address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                                            variant="outlined"
                                            error={Boolean(formErrors.email)}
                                            helperText={formErrors.email}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email sx={{ color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '& fieldset': {
                                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                                        borderWidth: 1.5,
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'primary.main',
                                                        borderWidth: 2,
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'primary.main',
                                                        borderWidth: 2,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    backgroundColor: 'white',
                                                    padding: '0 8px',
                                                    '&.Mui-focused': {
                                                        color: 'primary.main',
                                                    }
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '16px 14px',
                                                }
                                            }}
                    />
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                                            type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                                            variant="outlined"
                                            error={Boolean(formErrors.password)}
                                            helperText={formErrors.password}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock sx={{ color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword((v) => !v)}
                                                            edge="end"
                                                            sx={{ 
                                                                color: 'text.secondary',
                                                                '&:hover': {
                                                                    color: 'primary.main',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                                                }
                                                            }}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '& fieldset': {
                                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                                        borderWidth: 1.5,
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'primary.main',
                                                        borderWidth: 2,
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'primary.main',
                                                        borderWidth: 2,
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    backgroundColor: 'white',
                                                    padding: '0 8px',
                                                    '&.Mui-focused': {
                                                        color: 'primary.main',
                                                    }
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '16px 14px',
                                                }
                                            }}
                                        />
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                        <Link href="#" variant="body2">Forgot password?</Link>
                                    </Stack>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                                        disabled={isLoading || isSocialLoading !== null}
                                        sx={{ 
                                            mt: 3, 
                                            mb: 2,
                                            py: 1.5,
                                            position: 'relative',
                                            '&:disabled': {
                                                backgroundColor: 'primary.main',
                                                opacity: 0.7
                                            }
                                        }}
                                    >
                                        {isLoading ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <CircularProgress 
                                                    size={24} 
                                                    sx={{ 
                                                        color: 'white',
                                                        mr: 1.5,
                                                        '& .MuiCircularProgress-circle': {
                                                            strokeLinecap: 'round',
                                                        }
                                                    }} 
                                                />
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    Signing in...
                                                </Typography>
                                            </Box>
                                        ) : (
                                            'Sign in with Email'
                                        )}
                                    </Button>

                                    <Divider sx={{ my: 2 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                                            OR
                                        </Typography>
                                    </Divider>

                                    {/* Social Login Buttons */}
                                    <Stack spacing={2} sx={{ mb: 3 }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={isSocialLoading === 'google' ? null : <GoogleIcon />}
                                            onClick={handleGoogleLogin}
                                            disabled={isSocialLoading === 'google' || isLoading}
                                            sx={{
                                                py: 1.5,
                                                borderColor: '#db4437',
                                                color: '#db4437',
                                                position: 'relative',
                                                '&:hover': {
                                                    borderColor: '#c23321',
                                                    backgroundColor: 'rgba(219, 68, 55, 0.04)',
                                                },
                                                '&:disabled': {
                                                    borderColor: '#db4437',
                                                    color: '#db4437',
                                                    opacity: 0.7,
                                                }
                                            }}
                                        >
                                            {isSocialLoading === 'google' ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CircularProgress 
                                                        size={20} 
                                                        sx={{ 
                                                            color: '#db4437',
                                                            mr: 1.5,
                                                            '& .MuiCircularProgress-circle': {
                                                                strokeLinecap: 'round',
                                                            }
                                                        }} 
                                                    />
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        Connecting...
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                'Continue with Google'
                                            )}
                                        </Button>

                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={isSocialLoading === 'facebook' ? null : <FacebookIcon />}
                                            onClick={handleFacebookLogin}
                                            disabled={isSocialLoading === 'facebook' || isLoading}
                                            sx={{
                                                py: 1.5,
                                                borderColor: '#4267B2',
                                                color: '#4267B2',
                                                position: 'relative',
                                                '&:hover': {
                                                    borderColor: '#365899',
                                                    backgroundColor: 'rgba(66, 103, 178, 0.04)',
                                                },
                                                '&:disabled': {
                                                    borderColor: '#4267B2',
                                                    color: '#4267B2',
                                                    opacity: 0.7,
                                                }
                                            }}
                                        >
                                            {isSocialLoading === 'facebook' ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CircularProgress 
                                                        size={20} 
                                                        sx={{ 
                                                            color: '#4267B2',
                                                            mr: 1.5,
                                                            '& .MuiCircularProgress-circle': {
                                                                strokeLinecap: 'round',
                                                            }
                                                        }} 
                                                    />
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        Connecting...
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                'Continue with Facebook'
                                            )}
                                        </Button>

                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={isSocialLoading === 'apple' ? null : <AppleIcon />}
                                            onClick={handleAppleLogin}
                                            disabled={isSocialLoading === 'apple' || isLoading}
                                            sx={{
                                                py: 1.5,
                                                borderColor: '#000000',
                                                color: '#000000',
                                                position: 'relative',
                                                '&:hover': {
                                                    borderColor: '#333333',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                },
                                                '&:disabled': {
                                                    borderColor: '#000000',
                                                    color: '#000000',
                                                    opacity: 0.7,
                                                }
                                            }}
                                        >
                                            {isSocialLoading === 'apple' ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CircularProgress 
                                                        size={20} 
                                                        sx={{ 
                                                            color: '#000000',
                                                            mr: 1.5,
                                                            '& .MuiCircularProgress-circle': {
                                                                strokeLinecap: 'round',
                                                            }
                                                        }} 
                                                    />
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        Connecting...
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                'Continue with Apple'
                                            )}
                    </Button>
                                    </Stack>

                                    <Grid container justifyContent="center">
                        <Grid item>
                                            <Typography variant="body2" color="text.secondary">
                                                {"Don't have an account? "}
                                                <Link href={`/registration`} variant="body2">Sign up</Link>
                                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                            </CardContent>
                        </Card>
                    </Stack>
                </Paper>
                <Copyright sx={{ mt: 4, mb: 2 }} />
        </Container>
        </Box>
    );
}

export default Login;