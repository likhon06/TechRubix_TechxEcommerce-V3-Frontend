"use client"

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  LinearProgress,
  Chip,
  Paper,
  Stack,
  Button,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Fade,
  Slide,
  Zoom
} from '@mui/material';
import {
  People,
  Inventory,
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  Star,
  LocalShipping,
  Assessment,
  Add,
  Visibility,
  Edit,
  Delete,
  Refresh,
  TrendingDown,
  ArrowUpward,
  ArrowDownward,
  CalendarToday,
  TrendingFlat,
  Dashboard as DashboardIcon,
  Analytics,
  Store,
  PersonAdd
} from '@mui/icons-material';
import Link from 'next/link';

export default function DashboardPage() {
  const [allUser, setAllUser] = useState([]);
  const [allProducts, setAllProducts] = useState(0);
  const [flashProducts, setFlashProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [usersRes, productsRes, flashRes] = await Promise.all([
        fetch('https://tech-rubix-backend.vercel.app/all-users'),
        fetch('https://tech-rubix-backend.vercel.app/all-products'),
        fetch('https://tech-rubix-backend.vercel.app/flash-products')
      ]);

      const [users, products, flash] = await Promise.all([
        usersRes.json(),
        productsRes.json(),
        flashRes.json()
      ]);

      setAllUser(users);
      setAllProducts(products.length);
      setFlashProducts(flash.data?.length || 0);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: allUser.length,
      icon: <People />,
      color: 'primary',
      change: '+12%',
      trend: 'up',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Total Products',
      value: allProducts,
      icon: <Inventory />,
      color: 'success',
      change: '+8%',
      trend: 'up',
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Flash Sale Items',
      value: flashProducts,
      icon: <LocalShipping />,
      color: 'warning',
      change: '+15%',
      trend: 'up',
      bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      icon: <AttachMoney />,
      color: 'info',
      change: '+23%',
      trend: 'up',
      bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const recentActivities = [
    { action: 'New user registered', time: '2 minutes ago', type: 'user', status: 'success' },
    { action: 'Product added to store', time: '5 minutes ago', type: 'product', status: 'info' },
    { action: 'Order completed', time: '10 minutes ago', type: 'order', status: 'success' },
    { action: 'Flash sale started', time: '15 minutes ago', type: 'sale', status: 'warning' },
    { action: 'User profile updated', time: '20 minutes ago', type: 'user', status: 'info' },
    { action: 'Product out of stock', time: '25 minutes ago', type: 'product', status: 'error' },
  ];

  const quickActions = [
    { 
      title: 'Add Product', 
      icon: <Add />, 
      color: 'primary', 
      href: '/dashboard/admin/products/add-products',
      description: 'Create new product listing'
    },
    { 
      title: 'Manage Users', 
      icon: <People />, 
      color: 'success', 
      href: '/dashboard/admin/all-users',
      description: 'View and manage users'
    },
    { 
      title: 'View Products', 
      icon: <Inventory />, 
      color: 'info', 
      href: '/dashboard/admin/products',
      description: 'Manage product inventory'
    },
    { 
      title: 'Analytics', 
      icon: <Assessment />, 
      color: 'warning', 
      href: '#',
      description: 'View detailed analytics'
    }
  ];


  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header Section */}
      <Fade in timeout={600}>
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 }
                }}>
                  <DashboardIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h1" sx={{ 
                    fontWeight: 700, 
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Admin Dashboard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Welcome back! Here&apos;s what&apos;s happening with your store today.
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 1.5, 
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: { xs: 'flex-start', sm: 'flex-end' }
            }}>
              <Chip 
                icon={<CalendarToday />} 
                label="Last 7 days" 
                color="secondary" 
                variant="outlined" 
                size="small"
                clickable
              />
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={fetchData}
                disabled={refreshing}
                size="small"
                sx={{ minWidth: 'auto' }}
              >
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Zoom in timeout={600 + index * 100}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: stat.bgColor,
                  color: 'white',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: { xs: 'none', sm: 'translateY(-4px)' },
                    boxShadow: { xs: 2, sm: 8 }
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}>
                    <Avatar
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        mr: { xs: 0, sm: 2 },
                        mb: { xs: 1, sm: 0 },
                        width: { xs: 48, sm: 56 },
                        height: { xs: 48, sm: 56 },
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4" component="div" sx={{ 
                        fontWeight: 700, 
                        mb: 0.5,
                        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        opacity: 0.9,
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}>
                        {stat.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 0 }
                  }}>
                    <Chip
                      label={stat.change}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                      icon={stat.trend === 'up' ? <ArrowUpward /> : <ArrowDownward />}
                      size="small"
                    />
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.75rem' }}>
                      vs last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Recent Activities */}
        <Grid item xs={12} lg={8}>
          <Slide direction="up" in timeout={800}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 0 }
                }}>
                  <Typography variant="h6" component="h2" sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1.125rem', sm: '1.25rem' }
                  }}>
                    Recent Activities
                  </Typography>
                  <Button size="small" endIcon={<Visibility />} variant="outlined">
                    View All
                  </Button>
                </Box>
                <Stack spacing={1.5}>
                  {recentActivities.map((activity, index) => (
                    <Fade in timeout={1000 + index * 100} key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: { xs: 1.5, sm: 2 },
                          backgroundColor: 'grey.50',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'primary.50',
                            borderColor: 'primary.200',
                            transform: 'translateX(4px)'
                          }
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: activity.status === 'success' ? 'success.main' :
                                            activity.status === 'error' ? 'error.main' :
                                            activity.status === 'warning' ? 'warning.main' : 'info.main',
                            mr: 2,
                            width: { xs: 36, sm: 40 },
                            height: { xs: 36, sm: 40 }
                          }}
                        >
                          {activity.type === 'user' ? <People /> :
                           activity.type === 'product' ? <Inventory /> :
                           activity.type === 'order' ? <ShoppingCart /> : <LocalShipping />}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 500, 
                            mb: 0.5,
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                          }}>
                            {activity.action}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                        </Box>
                        <Chip 
                          label={activity.status} 
                          size="small" 
                          color={activity.status as any}
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </Fade>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Slide>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={4}>
          <Slide direction="up" in timeout={1000}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" component="h2" sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  fontSize: { xs: '1.125rem', sm: '1.25rem' }
                }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={12} sm={6} lg={12} key={index}>
                      <Fade in timeout={1200 + index * 100}>
                        <Button
                          component={Link}
                          href={action.href}
                          fullWidth
                          variant="outlined"
                          startIcon={action.icon}
                          sx={{
                            p: { xs: 1.5, sm: 2 },
                            height: 'auto',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'left',
                            border: '2px solid',
                            borderColor: `${action.color}.200`,
                            color: `${action.color}.main`,
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: `${action.color}.50`,
                              borderColor: `${action.color}.main`,
                              transform: { xs: 'none', sm: 'translateY(-2px)' },
                              boxShadow: { xs: 1, sm: 4 }
                            }
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ 
                            fontWeight: 600, 
                            mb: 0.5,
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                          }}>
                            {action.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {action.description}
                          </Typography>
                        </Button>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      </Grid>



    </Container>
  );
}