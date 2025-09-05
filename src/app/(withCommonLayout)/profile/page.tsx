"use client"

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
  TextField,
  IconButton,
  Tooltip,
  Fade,
  Slide,
  Zoom,
  Paper,
  Stack,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Edit,
  Save,
  Cancel,
  CameraAlt,
  Security,
  Notifications,
  Language,
  Palette,
  Lock,
  Visibility,
  VisibilityOff,
  Settings
} from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  joinDate: string;
  avatar?: string;
  bio?: string;
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    emailUpdates: boolean;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('Token'); // Note: Capital T
      console.log('Token found:', !!token);
      
      if (!token) {
        setSnackbar({ open: true, message: 'Please login to view profile', severity: 'error' });
        setLoading(false);
        return;
      }

      const decoded: any = jwtDecode(token);
      const userEmail = decoded.email; // Get email from token
      console.log('Decoded token:', decoded);
      console.log('User email:', userEmail);

      if (!userEmail) {
        setSnackbar({ open: true, message: 'Invalid token, please login again', severity: 'error' });
        setLoading(false);
        return;
      }

      // Fetch user data by email (same pattern as other pages)
      const response = await fetch(`https://tech-rubix-backend.vercel.app/user/${userEmail}`, {
        next: { revalidate: 1 }
      });
      
      console.log('User endpoint response:', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('User data:', userData);

        if (!userData) {
          console.log('No user data found');
          setSnackbar({ open: true, message: 'User not found', severity: 'error' });
          setLoading(false);
          return;
        }

        setProfile({
          id: userData._id || userData.id,
          name: userData.name || 'User Name',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          role: userData.role || 'user',
          joinDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown',
          avatar: userData.avatar || '',
          bio: userData.bio || '',
          preferences: {
            notifications: userData.preferences?.notifications ?? true,
            darkMode: userData.preferences?.darkMode ?? false,
            language: userData.preferences?.language ?? 'en',
            emailUpdates: userData.preferences?.emailUpdates ?? true
          }
        });

        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          bio: userData.bio || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setSnackbar({ open: true, message: `Failed to load profile: ${response.status}`, severity: 'error' });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setSnackbar({ open: true, message: 'Failed to load profile data', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    if (profile) {
      setProfile(prev => ({
        ...prev!,
        preferences: { ...prev!.preferences, [field]: value }
      }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('Token'); // Note: Capital T
      if (!token) return;

      const response = await fetch(`https://tech-rubix-backend.vercel.app/user/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          bio: formData.bio,
          preferences: profile?.preferences
        })
      });

      if (response.ok) {
        setProfile(prev => ({
          ...prev!,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          bio: formData.bio
        }));
        setEditing(false);
        setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    }
  };

  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setSnackbar({ open: true, message: 'Passwords do not match', severity: 'error' });
      return;
    }

    try {
      const token = localStorage.getItem('Token'); // Note: Capital T
      if (!token) return;

      const response = await fetch(`https://tech-rubix-backend.vercel.app/user/change-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      if (response.ok) {
        setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      } else {
        setSnackbar({ open: true, message: 'Failed to change password', severity: 'error' });
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      setSnackbar({ open: true, message: 'Failed to change password', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Loading profile...</Typography>
        </Box>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load profile data. Please try refreshing the page or login again.
        </Alert>
        <Button 
          variant="contained" 
          onClick={fetchUserProfile}
          sx={{ mr: 2 }}
        >
          Retry
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => window.location.href = '/login'}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Slide direction="down" in timeout={600}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.125rem' }
          }}>
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your personal information and preferences
          </Typography>
        </Box>
      </Slide>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Slide direction="right" in timeout={800}>
            <Card sx={{ height: 'fit-content' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                  <Avatar
                    src={profile.avatar}
                    sx={{
                      width: { xs: 80, sm: 100 },
                      height: { xs: 80, sm: 100 },
                      mx: 'auto',
                      mb: 2,
                      fontSize: { xs: '2rem', sm: '2.5rem' }
                    }}
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' }
                    }}
                    size="small"
                  >
                    <CameraAlt />
                  </IconButton>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {profile.email}
                </Typography>
                <Chip 
                  label={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} 
                  color="primary" 
                  size="small" 
                  sx={{ mb: 2 }}
                />
                <Typography variant="caption" color="text.secondary">
                  Member since {profile.joinDate}
                </Typography>
              </CardContent>
            </Card>
          </Slide>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Slide direction="left" in timeout={1000}>
            <Card>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 0 }
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {editing ? (
                      <>
                        <Button
                          variant="contained"
                          startIcon={<Save />}
                          onClick={handleSave}
                          size="small"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={() => setEditing(false)}
                          size="small"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => setEditing(true)}
                        size="small"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      disabled
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                      helperText="Email cannot be changed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!editing}
                      multiline
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Slide>

          {/* Password Change */}
          <Slide direction="left" in timeout={1200}>
            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  <Lock sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Change Password
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handlePasswordChange}
                      disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                    >
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Slide>

          {/* Preferences */}
          <Slide direction="left" in timeout={1400}>
            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  <Settings sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Preferences
                </Typography>

                <Stack spacing={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={profile.preferences.notifications}
                        onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Notifications sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography>Push Notifications</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={profile.preferences.darkMode}
                        onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Palette sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography>Dark Mode</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={profile.preferences.emailUpdates}
                        onChange={(e) => handlePreferenceChange('emailUpdates', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Email sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography>Email Updates</Typography>
                      </Box>
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
