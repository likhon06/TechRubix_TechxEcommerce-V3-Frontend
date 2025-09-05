"use client"
import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
  Chip,
  Avatar,
  InputAdornment,
  Fade
} from '@mui/material'
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  CheckCircle,
  Person,
  Subject,
  Message
} from '@mui/icons-material'
import { toast } from 'sonner'

const ContactusPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #00bcd4 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Fade in timeout={1000}>
              <Box>
                <Chip
                  label="Get in Touch"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    px: 2,
                    py: 1
                  }}
                />
                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    lineHeight: 1.2,
                    background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                    maxWidth: 600,
                    mx: 'auto',
                    mb: 4
                  }}
                >
                  Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                  <Chip
                    icon={<Phone />}
                    label="24/7 Support"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    icon={<Email />}
                    label="Quick Response"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Stack>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>

      {/* Contact Form & Info Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ p: 4, height: 'fit-content', boxShadow: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                Send us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    name="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Subject color="action" />
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    placeholder="Tell us how we can help you..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                          <Message color="action" />
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={loading ? <CheckCircle /> : <Send />}
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0, #1976d2)'
                      }
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </form>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={6}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 4 }}>
                Contact Information
              </Typography>
              <Stack spacing={3}>
                <Card sx={{ p: 3, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Avatar sx={{ backgroundColor: 'primary.main' }}>
                      <Phone />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                        Phone Support
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Call us for immediate assistance
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        +1 (555) 123-4567
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        +1 (555) 987-6543
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                <Card sx={{ p: 3, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Avatar sx={{ backgroundColor: 'secondary.main' }}>
                      <Email />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                        Email Support
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Send us an email anytime
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        support@techrubix.com
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        sales@techrubix.com
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                <Card sx={{ p: 3, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Avatar sx={{ backgroundColor: 'success.main' }}>
                      <LocationOn />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                        Our Office
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Visit our headquarters
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        123 Tech Street, Suite 100
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        San Francisco, CA 94105
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                <Card sx={{ p: 3, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Avatar sx={{ backgroundColor: 'info.main' }}>
                      <Schedule />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                        Business Hours
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        We&apos;re here to help
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Saturday - Sunday: 10:00 AM - 4:00 PM
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Still Have Questions?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Our support team is here to help you 24/7. Don&apos;t hesitate to reach out!
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<Phone />}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              Call Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Email />}
              sx={{
                color: 'white',
                borderColor: 'white',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                }
              }}
            >
              Email Us
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
          icon={<CheckCircle />}
        >
          Message sent successfully! We&apos;ll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ContactusPage
