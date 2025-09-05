
"use client"

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
  Paper,
  TextField,
  Button
} from '@mui/material';
import {
  Facebook,
  Twitter,
  YouTube,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  ShoppingCart,
  Favorite,
  Security,
  LocalShipping,
  Support,
  Payment,
  Store,
  TrendingUp,
  Star,
  Verified
} from '@mui/icons-material';
import Image from 'next/image';

const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', href: '/' },
        { text: 'Products', href: '/products' },
        { text: 'Flash Sale', href: '/flashsale' },
        { text: 'Categories', href: '/categories' },
        { text: 'About Us', href: '/aboutus' },
        { text: 'Contact', href: '/contactus' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { text: 'Help Center', href: '#' },
        { text: 'Track Your Order', href: '#' },
        { text: 'Returns & Exchanges', href: '#' },
        { text: 'Size Guide', href: '#' },
        { text: 'Shipping Info', href: '#' },
        { text: 'FAQ', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About TechRubix', href: '/aboutus' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Partnerships', href: '#' },
        { text: 'Investor Relations', href: '#' },
        { text: 'Sustainability', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: '#' },
        { text: 'Terms of Service', href: '#' },
        { text: 'Cookie Policy', href: '#' },
        { text: 'Refund Policy', href: '#' },
        { text: 'Warranty', href: '#' },
        { text: 'Accessibility', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <YouTube />, href: '#', label: 'YouTube' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' }
  ];

  const features = [
    { icon: <LocalShipping />, text: 'Free Shipping' },
    { icon: <Security />, text: 'Secure Payment' },
    { icon: <Support />, text: '24/7 Support' },
    { icon: <Verified />, text: 'Quality Guarantee' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.50',
        color: 'text.primary',
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
          opacity: 1
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main Footer Content */}
        <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
          <Grid container spacing={{ xs: 4, sm: 6, md: 8 }}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Image
                    src="/images/wlogo.png"
                    alt="TechRubix Logo"
                    width={140}
                    height={140}
                  />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700}}>TechRubix</Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  Your trusted destination for the latest technology products. 
                  We bring you cutting-edge electronics, gadgets, and accessories 
                  with unbeatable prices and exceptional service.
                </Typography>
                
                {/* Contact Info */}
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ mr: 1.5, color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      support@techrubix.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ mr: 1.5, color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1.5, color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      123 Tech Street, Digital City, DC 12345
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Social Links */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.href}
                      sx={{
                        color: 'text.secondary',
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: 2
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <Grid item xs={6} sm={3} md={2} key={index}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: 'text.primary'
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={1}>
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline'
                        },
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {link.text}
                    </Link>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>

          {/* Features Section */}
          <Box sx={{ mt: 6, mb: 4 }}>
            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'primary.50',
                        transform: 'translateY(-2px)',
                        boxShadow: 2
                      }
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 1 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {feature.text}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Newsletter Signup */}
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 3,
              p: 4,
              textAlign: 'center',
              mb: 4,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Subscribe to our newsletter for the latest deals and tech updates
            </Typography>
            {!isClient ? (
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                maxWidth: 500, 
                mx: 'auto', 
                flexDirection: 'column'
              }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <TextField
                    type="email"
                    placeholder="Enter your email address"
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        borderRadius: 2,
                        height: '56px',
                        '& fieldset': {
                          borderColor: 'divider',
                          borderWidth: 1,
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                          borderWidth: 1,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputBase-input': {
                        py: 1.5,
                        px: 2.5,
                        fontSize: '1rem',
                        '&::placeholder': {
                          fontSize: '0.9rem',
                          opacity: 0.7,
                        },
                      },
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    width: '100%',
                    minWidth: '140px',
                    height: '56px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 2, sm: 2, md: 3 }, 
                maxWidth: { xs: '100%', sm: 500, md: 600 }, 
                mx: 'auto', 
                flexDirection: { xs: 'column', sm: 'row' },
                px: { xs: 2, sm: 0 }
              }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <TextField
                    type="email"
                    placeholder="Enter your email address"
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        borderRadius: { xs: 1.5, sm: 2 },
                        height: { xs: '48px', sm: '56px' },
                        '& fieldset': {
                          borderColor: 'divider',
                          borderWidth: 1,
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                          borderWidth: 1,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputBase-input': {
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 2, sm: 2.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        '&::placeholder': {
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          opacity: 0.7,
                        },
                      },
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: { xs: 3, sm: 4, md: 5 },
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: { xs: 600, sm: 700 },
                    textTransform: 'none',
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: { xs: '100%', sm: '140px', md: '160px' },
                    height: { xs: '48px', sm: '56px' },
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Divider sx={{ borderColor: 'divider' }} />
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 TechRubix. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Made with ❤️ for tech enthusiasts
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                icon={<Star />}
                label="4.9/5"
                size="small"
                sx={{
                  backgroundColor: 'success.50',
                  color: 'success.main',
                  border: '1px solid',
                  borderColor: 'success.200'
                }}
              />
              <Chip
                icon={<TrendingUp />}
                label="Trusted"
                size="small"
                sx={{
                  backgroundColor: 'primary.50',
                  color: 'primary.main',
                  border: '1px solid',
                  borderColor: 'primary.200'
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer