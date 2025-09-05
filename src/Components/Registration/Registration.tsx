"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { RegistrationSignIn } from './RegistrationSignIn';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Phone from '@mui/icons-material/Phone';
import LocationOn from '@mui/icons-material/LocationOn';
import Business from '@mui/icons-material/Business';
import Work from '@mui/icons-material/Work';
import School from '@mui/icons-material/School';
import Public from '@mui/icons-material/Public';
import Person from '@mui/icons-material/Person';
import Email from '@mui/icons-material/Email';
import LockOutlined from '@mui/icons-material/LockOutlined';
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

interface RegResponse {
    data: {
        success: boolean;
        message: string;
        accessToken: string;
    }
}

const userSchema = z.object({
    first_name: z.string().min(1, 'First name is required').max(18, 'Max 18 characters'),
    last_name: z.string().min(1, 'Last name is required').max(18, 'Max 18 characters'),
    email: z.string().email('Enter a valid email'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    country_code: z.string().min(1, 'Country code is required'),
    date_of_birth: z.string().min(1, 'Date of birth is required'),
    gender: z.string().min(1, 'Gender is required'),
    occupation: z.string().min(1, 'Occupation is required'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    zip_code: z.string().min(3, 'Zip code must be at least 3 characters'),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(18, "Password must be at most 18 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirm_password: z.string(),
    terms_accepted: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    }),
    newsletter: z.boolean().optional(),
    role: z.string().min(1).max(18),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});

type RegResponseType = {
    data: {
        success: boolean;
        message: string;
        accessToken: string;
    }
};


const Registration = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);
    const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
    const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
    const [newsletter, setNewsletter] = React.useState<boolean>(false);

    const countryCodes = [
        { code: '+1', country: 'United States', flag: '🇺🇸' },
        { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
        { code: '+91', country: 'India', flag: '🇮🇳' },
        { code: '+86', country: 'China', flag: '🇨🇳' },
        { code: '+81', country: 'Japan', flag: '🇯🇵' },
        { code: '+49', country: 'Germany', flag: '🇩🇪' },
        { code: '+33', country: 'France', flag: '🇫🇷' },
        { code: '+39', country: 'Italy', flag: '🇮🇹' },
        { code: '+34', country: 'Spain', flag: '🇪🇸' },
        { code: '+61', country: 'Australia', flag: '🇦🇺' },
        { code: '+55', country: 'Brazil', flag: '🇧🇷' },
        { code: '+7', country: 'Russia', flag: '🇷🇺' },
        { code: '+82', country: 'South Korea', flag: '🇰🇷' },
        { code: '+65', country: 'Singapore', flag: '🇸🇬' },
        { code: '+971', country: 'UAE', flag: '🇦🇪' },
        { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
        { code: '+20', country: 'Egypt', flag: '🇪🇬' },
        { code: '+27', country: 'South Africa', flag: '🇿🇦' },
        { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
        { code: '+92', country: 'Pakistan', flag: '🇵🇰' }
    ];

    const countries = [
        'United States', 'United Kingdom', 'India', 'China', 'Japan', 'Germany', 
        'France', 'Italy', 'Spain', 'Australia', 'Brazil', 'Russia', 'South Korea', 
        'Singapore', 'UAE', 'Saudi Arabia', 'Egypt', 'South Africa', 'Bangladesh', 
        'Pakistan', 'Canada', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'Peru', 
        'Venezuela', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 
        'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 
        'Romania', 'Bulgaria', 'Greece', 'Turkey', 'Israel', 'Jordan', 'Lebanon', 
        'Morocco', 'Tunisia', 'Algeria', 'Nigeria', 'Kenya', 'Ghana', 'Ethiopia', 
        'Uganda', 'Tanzania', 'Zimbabwe', 'Botswana', 'Namibia', 'Mauritius', 
        'Madagascar', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 
        'Myanmar', 'Cambodia', 'Laos', 'Nepal', 'Sri Lanka', 'Afghanistan', 'Iran', 
        'Iraq', 'Syria', 'Yemen', 'Oman', 'Qatar', 'Kuwait', 'Bahrain', 'Jordan'
    ];

    const occupations = [
        'Student', 'Software Developer', 'Designer', 'Manager', 'Engineer', 
        'Doctor', 'Teacher', 'Lawyer', 'Accountant', 'Sales Representative', 
        'Marketing Specialist', 'Data Analyst', 'Project Manager', 'Consultant', 
        'Entrepreneur', 'Freelancer', 'Retired', 'Unemployed', 'Other'
    ];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const RegData = {
            first_name: data.get('firstName') as string,
            last_name: data.get('lastName') as string,
            email: data.get('email') as string,
            phone: data.get('phone') as string,
            country_code: data.get('countryCode') as string,
            date_of_birth: data.get('dateOfBirth') as string,
            gender: data.get('gender') as string,
            occupation: data.get('occupation') as string,
            address: data.get('address') as string,
            city: data.get('city') as string,
            country: data.get('country') as string,
            zip_code: data.get('zipCode') as string,
            password: data.get('password') as string,
            confirm_password: data.get('confirmPassword') as string,
            terms_accepted: termsAccepted,
            newsletter: newsletter,
            role: 'user'
        };

        const parsed = userSchema.safeParse(RegData);
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
            const res = await RegistrationSignIn({
                first_name: parsed.data.first_name,
                last_name: parsed.data.last_name,
                email: parsed.data.email,
                password: parsed.data.password,
                role: parsed.data.role,
            });
            if (res && res?.success) {
                toast.success("Account registration completed");
                const TOKEN: string = res?.accessToken as string;
                localStorage.setItem('Token', TOKEN);
                // Dispatch custom event to notify navbar of auth change
                window.dispatchEvent(new CustomEvent('authChange'));
                router.push('/');
            } else {
                toast.error(res?.message || "User already exists!");
            }
        } catch (error) {
            toast.error("An error occurred while registering account");
            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: (theme) => theme.palette.grey[100] }}>
            <Container component="main" maxWidth="md">
            <CssBaseline />
                <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, background: '#fff' }}>
                    <Stack spacing={2} alignItems="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Image
                                src="/images/web_logo.jpeg"
                                alt="TechRubix Logo"
                                width={60}
                                height={60}
                                style={{ marginRight: '12px' }}
                            />
                            <Box textAlign="center">
                                <Typography component="h1" variant="h5" fontWeight={700}>
                                    Create your account
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Join us to start shopping smarter
                                </Typography>
                            </Box>
                        </Box>
                        <Card elevation={0} sx={{ width: '100%' }}>
                            <CardContent>
                                <Box component="form" noValidate onSubmit={handleSubmit}>
                                    {/* Personal Information Section */}
                                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                                        Personal Information
                </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                                label="First name"
                                autoFocus
                                                error={Boolean(formErrors.first_name)}
                                                helperText={formErrors.first_name}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Person />
                                                        </InputAdornment>
                                                    )
                                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                                label="Last name"
                                name="lastName"
                                autoComplete="family-name"
                                                error={Boolean(formErrors.last_name)}
                                                helperText={formErrors.last_name}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Person />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email address"
                                                name="email"
                                                autoComplete="email"
                                                error={Boolean(formErrors.email)}
                                                helperText={formErrors.email}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Email />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth error={Boolean(formErrors.gender)}>
                                                <InputLabel>Gender</InputLabel>
                                                <Select
                                                    name="gender"
                                                    label="Gender"
                                                    defaultValue=""
                                                >
                                                    <MenuItem value="male">Male</MenuItem>
                                                    <MenuItem value="female">Female</MenuItem>
                                                    <MenuItem value="other">Other</MenuItem>
                                                    <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                                                </Select>
                                                {formErrors.gender && (
                                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                                                        {formErrors.gender}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="dateOfBirth"
                                                label="Date of Birth"
                                                type="date"
                                                id="dateOfBirth"
                                                InputLabelProps={{ shrink: true }}
                                                error={Boolean(formErrors.date_of_birth)}
                                                helperText={formErrors.date_of_birth}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth error={Boolean(formErrors.occupation)}>
                                                <InputLabel>Occupation</InputLabel>
                                                <Select
                                                    name="occupation"
                                                    label="Occupation"
                                                    defaultValue=""
                                                >
                                                    {occupations.map((occupation) => (
                                                        <MenuItem key={occupation} value={occupation}>
                                                            {occupation}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {formErrors.occupation && (
                                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                                                        {formErrors.occupation}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 3 }} />

                                    {/* Contact Information Section */}
                                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                                        Contact Information
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth error={Boolean(formErrors.country_code)}>
                                                <InputLabel>Country Code</InputLabel>
                                                <Select
                                                    name="countryCode"
                                                    label="Country Code"
                                                    defaultValue=""
                                                >
                                                    {countryCodes.map((country) => (
                                                        <MenuItem key={country.code} value={country.code}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <span>{country.flag}</span>
                                                                <span>{country.code}</span>
                                                                <span style={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                                                    {country.country}
                                                                </span>
                                                            </Box>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {formErrors.country_code && (
                                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                                                        {formErrors.country_code}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="phone"
                                                label="Phone Number"
                                                type="tel"
                                                id="phone"
                                                error={Boolean(formErrors.phone)}
                                                helperText={formErrors.phone}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Phone />
                                                        </InputAdornment>
                                                    )
                                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                                name="address"
                                                label="Address"
                                                id="address"
                                                multiline
                                                rows={2}
                                                error={Boolean(formErrors.address)}
                                                helperText={formErrors.address}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationOn />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="city"
                                                label="City"
                                                id="city"
                                                error={Boolean(formErrors.city)}
                                                helperText={formErrors.city}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth error={Boolean(formErrors.country)}>
                                                <InputLabel>Country</InputLabel>
                                                <Select
                                                    name="country"
                                                    label="Country"
                                                    defaultValue=""
                                                >
                                                    {countries.map((country) => (
                                                        <MenuItem key={country} value={country}>
                                                            {country}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {formErrors.country && (
                                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                                                        {formErrors.country}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="zipCode"
                                                label="Zip Code"
                                                id="zipCode"
                                                error={Boolean(formErrors.zip_code)}
                                                helperText={formErrors.zip_code}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 3 }} />

                                    {/* Security Section */}
                                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                                        Security
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                autoComplete="new-password"
                                                error={Boolean(formErrors.password)}
                                                helperText={formErrors.password}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockOutlined />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowPassword((v) => !v)}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                                name="confirmPassword"
                                                label="Confirm password"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                autoComplete="new-password"
                                                error={Boolean(formErrors.confirm_password)}
                                                helperText={formErrors.confirm_password}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockOutlined />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle confirm password visibility"
                                                                onClick={() => setShowConfirmPassword((v) => !v)}
                                                                edge="end"
                                                            >
                                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                            />
                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 3 }} />

                                    {/* Terms and Preferences */}
                                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                                        Terms & Preferences
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={termsAccepted}
                                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                                        color="primary"
                                                    />
                                                }
                                                label={
                                                    <Typography variant="body2">
                                                        I agree to the{' '}
                                                        <Link href="#" color="primary">
                                                            Terms and Conditions
                                                        </Link>{' '}
                                                        and{' '}
                                                        <Link href="#" color="primary">
                                                            Privacy Policy
                                                        </Link>
                                                    </Typography>
                                                }
                                            />
                                            {formErrors.terms_accepted && (
                                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 4 }}>
                                                    {formErrors.terms_accepted}
                                                </Typography>
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={newsletter}
                                                        onChange={(e) => setNewsletter(e.target.checked)}
                                                        color="primary"
                                                    />
                                                }
                                                label="Subscribe to newsletter for updates and offers"
                                            />
                                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
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
                                    Creating account...
                                </Typography>
                            </Box>
                        ) : (
                            'Create account'
                        )}
                    </Button>
                                    <Grid container justifyContent="center">
                        <Grid item>
                                            <Typography variant="body2" color="text.secondary">
                                                Already have an account? <Link href={`/login`} variant="body2">Sign in</Link>
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

export default Registration;