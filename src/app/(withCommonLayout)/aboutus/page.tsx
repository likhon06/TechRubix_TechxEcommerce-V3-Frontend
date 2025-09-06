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
          background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,107,107,0.1) 0%, rgba(78,205,196,0.1) 50%, rgba(69,183,209,0.1) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Chip
                  label="About Us"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                />
                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    lineHeight: 1.2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  About <span style={{ color: '#FFE082', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Our Company</span>
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
                  <Chip 
                    label="Trusted by 10K+ customers" 
                    sx={{ 
                      color: 'white', 
                      borderColor: 'rgba(255,255,255,0.5)', 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                    }} 
                  />
                  <Chip 
                    label="5+ years experience" 
                    sx={{ 
                      color: 'white', 
                      borderColor: 'rgba(255,255,255,0.5)', 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                    }} 
                  />
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
            <Card sx={{ 
              textAlign: 'center', 
              p: 3, 
              height: '100%',
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
              border: 'none',
              boxShadow: '0 8px 32px rgba(255, 154, 158, 0.3)',
              transition: 'transform 0.3s ease, boxShadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px rgba(255, 154, 158, 0.4)'
              }
            }}>
              <CardContent>
                <Avatar sx={{ 
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)', 
                  width: 64, 
                  height: 64, 
                  mx: 'auto', 
                  mb: 2,
                  boxShadow: '0 4px 16px rgba(255, 107, 107, 0.4)'
                }}>
                  <People />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1 
                }}>
                  10K+
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Happy Customers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ 
              textAlign: 'center', 
              p: 3, 
              height: '100%',
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              border: 'none',
              boxShadow: '0 8px 32px rgba(168, 237, 234, 0.3)',
              transition: 'transform 0.3s ease, boxShadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px rgba(168, 237, 234, 0.4)'
              }
            }}>
              <CardContent>
                <Avatar sx={{ 
                  background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)', 
                  width: 64, 
                  height: 64, 
                  mx: 'auto', 
                  mb: 2,
                  boxShadow: '0 4px 16px rgba(78, 205, 196, 0.4)'
                }}>
                  <Business />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1 
                }}>
                  50+
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Team Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ 
              textAlign: 'center', 
              p: 3, 
              height: '100%',
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              border: 'none',
              boxShadow: '0 8px 32px rgba(252, 182, 159, 0.3)',
              transition: 'transform 0.3s ease, boxShadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px rgba(252, 182, 159, 0.4)'
              }
            }}>
              <CardContent>
                <Avatar sx={{ 
                  background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)', 
                  width: 64, 
                  height: 64, 
                  mx: 'auto', 
                  mb: 2,
                  boxShadow: '0 4px 16px rgba(255, 154, 86, 0.4)'
                }}>
                  <EmojiEvents />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1 
                }}>
                  5+
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Years Experience
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ 
              textAlign: 'center', 
              p: 3, 
              height: '100%',
              background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
              border: 'none',
              boxShadow: '0 8px 32px rgba(210, 153, 194, 0.3)',
              transition: 'transform 0.3s ease, boxShadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px rgba(210, 153, 194, 0.4)'
              }
            }}>
              <CardContent>
                <Avatar sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  width: 64, 
                  height: 64, 
                  mx: 'auto', 
                  mb: 2,
                  boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
                }}>
                  <Support />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1 
                }}>
                  99%
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Customer Satisfaction
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Our Story Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
          zIndex: 1
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
                    zIndex: 1
                  }
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
                    borderRadius: '12px',
                    position: 'relative',
                    zIndex: 2
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" component="h2" sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Our Story
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3, 
                  lineHeight: 1.7, 
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1.1rem'
                }}>
                  Founded in 2019, TechRubix started as a small team of tech enthusiasts who believed that everyone deserves access to the latest technology. What began as a passion project has grown into a trusted platform serving thousands of customers worldwide.
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 4, 
                  lineHeight: 1.7, 
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1.1rem'
                }}>
                  We carefully curate our product selection, working directly with manufacturers to ensure quality and authenticity. Our commitment to customer satisfaction and competitive pricing has made us a leader in the tech e-commerce space.
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip 
                    label="Quality Assured" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
                      color: 'white',
                      fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)'
                    }} 
                  />
                  <Chip 
                    label="Fast Shipping" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                      color: 'white',
                      fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(78, 205, 196, 0.3)'
                    }} 
                  />
                  <Chip 
                    label="24/7 Support" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)',
                      color: 'white',
                      fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(255, 154, 86, 0.3)'
                    }} 
                  />
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

