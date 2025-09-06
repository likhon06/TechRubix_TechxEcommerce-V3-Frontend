"use client"
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  Chip, 
  Button, 
  Container,
  Paper,
  Stack,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { 
  ShoppingCart, 
  Person, 
  LocalShipping, 
  Favorite, 
  History, 
  Settings, 
  TrendingUp,
  CheckCircle,
  Pending,
  Cancel,
  Visibility
} from '@mui/icons-material';
// Dynamic import for jwtDecode to prevent SSR issues
const jwtDecode = typeof window !== 'undefined' ? require('jwt-decode').jwtDecode : null;
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  date: string;
  items: number;
}

const UserDashboardPage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalOrders: 0,
    wishlistItems: 0,
    cartItems: 0
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      try {
        const storedToken = localStorage.getItem('Token');
        if (storedToken && jwtDecode) {
          const decodedToken: {
            email: string;
            role: string;
            first_name?: string;
            last_name?: string;
          } = jwtDecode(storedToken);
          setUserEmail(decodedToken.email);
          setUserName(`${decodedToken.first_name || ''} ${decodedToken.last_name || ''}`.trim() || 'User');
        }
      } catch (error) {
        console.error('Invalid token', error);
        // Clear invalid token
        localStorage.removeItem('Token');
      }
    }
  }, []);

  useEffect(() => {
    // Only run on client side and when userEmail is available
    if (typeof window !== 'undefined' && userEmail) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          
          // Fetch cart data
          const cartRes = await fetch(`https://tech-rubix-backend.vercel.app/cart/${userEmail}`, {
            next: { revalidate: 1 }
          });
          
          if (!cartRes.ok) {
            throw new Error(`HTTP error! status: ${cartRes.status}`);
          }
          
          const cartResult = await cartRes.json();
          setCartData(Array.isArray(cartResult) ? cartResult : []);
          
          // Mock recent orders (replace with actual API call)
          setRecentOrders([
            {
              id: '1',
              status: 'delivered',
              total: 299.99,
              date: '2024-01-15',
              items: 3
            },
            {
              id: '2',
              status: 'shipped',
              total: 149.99,
              date: '2024-01-20',
              items: 2
            },
            {
              id: '3',
              status: 'pending',
              total: 89.99,
              date: '2024-01-25',
              items: 1
            }
          ]);
          
          // Calculate stats
          setStats({
            totalSpent: 1250.50,
            totalOrders: 12,
            wishlistItems: 8,
            cartItems: Array.isArray(cartResult) ? cartResult.length : 0
          });
          
        } catch (err) {
          console.error('Failed to load dashboard data:', err);
          toast.error('Failed to load dashboard data');
          
          // Set default values on error
          setCartData([]);
          setRecentOrders([]);
          setStats({
            totalSpent: 0,
            totalOrders: 0,
            wishlistItems: 0,
            cartItems: 0
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchUserData();
    } else if (typeof window !== 'undefined') {
      // If no userEmail, set loading to false
      setLoading(false);
    }
  }, [userEmail]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle />;
      case 'shipped': return <LocalShipping />;
      case 'pending': return <Pending />;
      case 'cancelled': return <Cancel />;
      default: return <History />;
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
  return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading your dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Welcome back, {userName}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Here&apos;s what&apos;s happening with your account
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transform: 'translate(30px, -30px)'
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <ShoppingCart />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {stats.cartItems}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Items in Cart
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transform: 'translate(30px, -30px)'
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <History />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {stats.totalOrders}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transform: 'translate(30px, -30px)'
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <TrendingUp />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  ${stats.totalSpent}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Spent
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transform: 'translate(30px, -30px)'
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <Favorite />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {stats.wishlistItems}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Wishlist Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Settings color="primary" />
                Quick Actions
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href="/cart" sx={{ borderRadius: 2, mb: 1 }}>
                    <ListItemIcon>
                      <Badge badgeContent={stats.cartItems} color="primary">
                        <ShoppingCart />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText primary="View Cart" secondary="Manage your cart items" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href="/dashboard/user/my-orders" sx={{ borderRadius: 2, mb: 1 }}>
                    <ListItemIcon>
                      <History />
                    </ListItemIcon>
                    <ListItemText primary="My Orders" secondary="Track your orders" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href="/profile" sx={{ borderRadius: 2, mb: 1 }}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Profile" secondary="Update your information" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ borderRadius: 2 }}>
                    <ListItemIcon>
                      <Favorite />
                    </ListItemIcon>
                    <ListItemText primary="Wishlist" secondary="Your saved items" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping color="primary" />
                  Recent Orders
                </Typography>
                <Button 
                  component={Link} 
                  href="/dashboard/user/my-orders" 
                  variant="outlined" 
                  size="small"
                  endIcon={<Visibility />}
                >
                  View All
                </Button>
              </Box>
              
              {recentOrders.length > 0 ? (
                <Stack spacing={2}>
                  {recentOrders.map((order) => (
                    <Paper 
                      key={order.id} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        '&:hover': {
                          boxShadow: 2,
                          borderColor: 'primary.main'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Order #{order.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(order.date).toLocaleDateString()} • {order.items} items
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            ${order.total}
                          </Typography>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status) as any}
                            size="small"
                            icon={getStatusIcon(order.status)}
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <History sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No orders yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Start shopping to see your orders here
                  </Typography>
                  <Button variant="contained" component={Link} href="/">
                    Start Shopping
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Cart Summary */}
        {cartData.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShoppingCart color="primary" />
                  Cart Summary
                </Typography>
                <Grid container spacing={2}>
                  {cartData.slice(0, 3).map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                      <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Avatar 
                            src={item.image} 
                            alt={item.name}
                            sx={{ width: 60, height: 60 }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Qty: {item.quantity}
                            </Typography>
                            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                              ${item.price}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                {cartData.length > 3 && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      And {cartData.length - 3} more items...
                    </Typography>
                  </Box>
                )}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    href="/cart"
                    startIcon={<ShoppingCart />}
                    size="large"
                  >
                    View Full Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default UserDashboardPage;
