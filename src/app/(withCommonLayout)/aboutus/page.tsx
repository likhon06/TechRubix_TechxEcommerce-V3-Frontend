"use client"
import Image from 'next/image'
import React from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Divider
} from '@mui/material'
import {
  Business,
  People,
  EmojiEvents,
  Support,
  Security,
  Speed
} from '@mui/icons-material'

const AboutusPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Chip
                  label="About Us"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 3
                  }}
                />
                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    lineHeight: 1.2
                  }}
                >
                  About <span style={{ color: '#FFD700' }}>Our Company</span>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                    mb: 4
                  }}
                >
                  We are passionate about technology and committed to bringing you the latest and greatest tech products at unbeatable prices. Our mission is to make cutting-edge technology accessible to everyone.
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip label="Trusted by 10K+ customers" color="primary" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                  <Chip label="5+ years experience" color="primary" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Our Team"
                  width={800}
                  height={600}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                  <People />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  10K+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Happy Customers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                  <Business />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  50+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Team Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                  <EmojiEvents />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  5+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Years Experience
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                  <Support />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  99%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Customer Satisfaction
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Our Story Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden'
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                  alt="Our Story"
                  width={600}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                  Our Story
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: 'text.secondary' }}>
                  Founded in 2019, TechRubix started as a small team of tech enthusiasts who believed that everyone deserves access to the latest technology. What began as a passion project has grown into a trusted platform serving thousands of customers worldwide.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7, color: 'text.secondary' }}>
                  We carefully curate our product selection, working directly with manufacturers to ensure quality and authenticity. Our commitment to customer satisfaction and competitive pricing has made us a leader in the tech e-commerce space.
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip label="Quality Assured" color="primary" />
                  <Chip label="Fast Shipping" color="secondary" />
                  <Chip label="24/7 Support" color="success" />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default AboutusPage

