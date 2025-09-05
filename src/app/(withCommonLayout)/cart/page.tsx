"use client"
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  IconButton, 
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  Stack,
  Chip,
  Alert,
  Skeleton
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { 
  Add, 
  Remove, 
  Delete, 
  ShoppingCart, 
  ArrowBack,
  LocalShipping,
  Payment,
  Security
} from '@mui/icons-material';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  discount?: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Cart data - in real app, this would come from context/API
  useEffect(() => {
    const fetchCartItems = () => {
      try {
        setLoading(true);
        // Start with empty cart
        setCartItems([]);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setError('Failed to load cart items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
    
    if (newQuantity > cartItems.find(item => item.id === id)?.stock!) {
      toast.error('Quantity cannot exceed available stock');
    }
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discount) {
        return total + (item.price * item.quantity * item.discount / 100);
      }
      return total;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" height={60} width="30%" sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {[...Array(3)].map((_, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Skeleton variant="rectangular" width={120} height={120} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" height={30} />
                        <Skeleton variant="text" height={20} width="60%" />
                        <Skeleton variant="text" height={20} width="40%" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Button
              component={Link}
              href="/"
              startIcon={<ArrowBack />}
              sx={{ textTransform: 'none' }}
            >
              Continue Shopping
            </Button>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Shopping Cart
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {getItemCount()} item{getItemCount() !== 1 ? 's' : ''} in your cart
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
              Your cart is empty
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              Looks like you haven't added any items to your cart yet
            </Typography>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Cart Items
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={clearCart}
                    sx={{ textTransform: 'none' }}
                  >
                    Clear Cart
                  </Button>
                </Box>
                
                <Stack spacing={2}>
                  {cartItems.map((item) => (
                    <Box key={item.id}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ position: 'relative', minWidth: 120, height: 120 }}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            style={{
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                          {item.discount && (
                            <Chip
                              label={`-${item.discount}%`}
                              color="error"
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                                fontWeight: 700,
                              }}
                            />
                          )}
                        </Box>
                        
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              mb: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {item.name}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                              {formatPrice(item.price)}
                            </Typography>
                            {item.discount && (
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  textDecoration: 'line-through', 
                                  color: 'text.secondary' 
                                }}
                              >
                                {formatPrice(item.price * (1 + item.discount / 100))}
                              </Typography>
                            )}
                          </Box>
                          
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            Stock: {item.stock} available
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                sx={{ 
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  borderRadius: 1,
                                  width: 32,
                                  height: 32
                                }}
                              >
                                <Remove fontSize="small" />
                              </IconButton>
                              <TextField
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1;
                                  updateQuantity(item.id, newQuantity);
                                }}
                                size="small"
                                sx={{ 
                                  width: 60,
                                  '& .MuiOutlinedInput-root': {
                                    '& input': { textAlign: 'center' }
                                  }
                                }}
                                inputProps={{ min: 1, max: item.stock }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                sx={{ 
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  borderRadius: 1,
                                  width: 32,
                                  height: 32
                                }}
                              >
                                <Add fontSize="small" />
                              </IconButton>
                            </Box>
                            
                            <IconButton
                              color="error"
                              onClick={() => removeItem(item.id)}
                              sx={{ ml: 'auto' }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                      <Divider sx={{ mt: 2 }} />
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 3, position: 'sticky', top: 20 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Order Summary
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">{formatPrice(calculateSubtotal())}</Typography>
                  </Box>
                  
                  {calculateDiscount() > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="success.main">Discount</Typography>
                      <Typography variant="body2" color="success.main">
                        -{formatPrice(calculateDiscount())}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Shipping</Typography>
                    <Typography variant="body2" color="success.main">Free</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {formatPrice(calculateTotal())}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ 
                    mb: 2, 
                    py: 1.5, 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{ 
                    py: 1.5, 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Save for Later
                </Button>

                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocalShipping fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Free Shipping
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Orders over $100 qualify for free shipping
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Security fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Secure Payment
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Your payment information is safe and encrypted
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
