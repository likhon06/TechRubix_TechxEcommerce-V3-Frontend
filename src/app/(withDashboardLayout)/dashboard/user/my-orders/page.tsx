
"use client"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import React from 'react'
import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from 'jwt-decode';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import Image from 'next/image';
import { 
  ShoppingCart, 
  Delete, 
  Add, 
  Remove, 
  CheckCircle, 
  Pending, 
  LocalShipping,
  Receipt,
  Visibility
} from '@mui/icons-material';
import { toast } from 'sonner';

interface CartItem {
  _id: string;
  product_id: string;
  quantity: number;
  user_email: string;
  product?: {
    _id: string;
    name: string;
    category: string;
    image: string;
    regular_price: number;
    sale_price: number;
    discount: number;
    stock: number;
  };
}

interface Order {
  _id: string;
  user_email: string;
  items: CartItem[];
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  order_date: string;
  shipping_address: string;
}

const MyOrdersPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedToken = localStorage.getItem('Token');
        if (storedToken) {
          const decodedToken: {
            email: string;
            role: string;
          } = jwtDecode(storedToken);
          setUserEmail(decodedToken.email);
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const fetchCartData = useCallback(async () => {
    if (!userEmail) return;
    
    try {
      setLoading(true);
      const res = await fetch(`https://tech-rubix-backend.vercel.app/cart/${userEmail}`, {
        next: { revalidate: 1 }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const cartData = await res.json();
      
      // Fetch product details for each cart item
      const cartItemsWithProducts = await Promise.all(
        cartData.map(async (item: any) => {
          try {
            const productRes = await fetch(`https://tech-rubix-backend.vercel.app/products/${item.product_id}`, {
              next: { revalidate: 1 }
            });
            const productData = await productRes.json();
            return {
              ...item,
              product: productData
            };
          } catch (error) {
            console.error(`Failed to fetch product ${item.product_id}:`, error);
            return item;
          }
        })
      );
      
      setCartItems(cartItemsWithProducts);
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      toast.error('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  const fetchOrders = useCallback(async () => {
    if (!userEmail) return;
    
    try {
      // Mock orders for now - replace with actual API call
      const mockOrders: Order[] = [
        {
          _id: '1',
          user_email: userEmail,
          items: cartItems.slice(0, 2),
          total_amount: 450.99,
          status: 'delivered',
          order_date: '2024-01-15',
          shipping_address: '123 Main St, City, State 12345'
        },
        {
          _id: '2',
          user_email: userEmail,
          items: cartItems.slice(2, 4),
          total_amount: 299.99,
          status: 'shipped',
          order_date: '2024-01-20',
          shipping_address: '123 Main St, City, State 12345'
        }
      ];
      setOrders(mockOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, [userEmail, cartItems]);

  useEffect(() => {
    if (userEmail) {
      fetchCartData();
      fetchOrders();
    }
  }, [userEmail, fetchCartData, fetchOrders]);

  const handleRemoveFromCart = async (cartItemId: string) => {
    try {
      const res = await fetch(`https://tech-rubix-backend.vercel.app/cart/${cartItemId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        toast.success('Item removed from cart');
        fetchCartData(); // Refresh cart data
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const res = await fetch(`https://tech-rubix-backend.vercel.app/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      
      if (res.ok) {
        toast.success('Quantity updated');
        fetchCartData(); // Refresh cart data
      } else {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const handlePlaceOrder = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to order');
      return;
    }
    
    if (!shippingAddress.trim()) {
      toast.error('Please enter shipping address');
      return;
    }
    
    try {
      setIsPlacingOrder(true);
      
      // Mock order placement - replace with actual API call
      const newOrder: Order = {
        _id: Date.now().toString(),
        user_email: userEmail!,
        items: cartItems.filter(item => selectedItems.includes(item._id)),
        total_amount: cartItems
          .filter(item => selectedItems.includes(item._id))
          .reduce((total, item) => total + (item.product?.sale_price || 0) * item.quantity, 0),
        status: 'pending',
        order_date: new Date().toISOString().split('T')[0],
        shipping_address: shippingAddress
      };
      
      setOrders(prev => [newOrder, ...prev]);
      setOrderDialogOpen(false);
      setSelectedItems([]);
      setShippingAddress('');
      toast.success('Order placed successfully!');
      
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'pending': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle />;
      case 'shipped': return <LocalShipping />;
      case 'processing': return <Pending />;
      case 'pending': return <Pending />;
      case 'cancelled': return <Delete />;
      default: return <Receipt />;
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.sale_price || 0) * item.quantity;
    }, 0);
  };

  if (!mounted || loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
        <SyncLoader
          color="#1976d2"
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        My Orders & Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Shopping Cart ({cartItems.length} items)
                </Typography>
                {cartItems.length > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOrderDialogOpen(true)}
                    startIcon={<ShoppingCart />}
                  >
                    Place Order
                  </Button>
                )}
              </Box>

              {cartItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Your cart is empty
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add some products to get started
                  </Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar
                                src={item.product?.image}
                                alt={item.product?.name}
                                sx={{ width: 60, height: 60 }}
                              />
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                  {item.product?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.product?.category}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              {item.product?.regular_price && item.product.regular_price > item.product.sale_price && (
                                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                  ${item.product.regular_price}
                                </Typography>
                              )}
                              <Typography variant="h6" color="primary">
                                ${item.product?.sale_price}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Remove />
                              </IconButton>
                              <Typography variant="body1" sx={{ minWidth: 30, textAlign: 'center' }}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                disabled={item.quantity >= (item.product?.stock || 0)}
                              >
                                <Add />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" color="primary">
                              ${((item.product?.sale_price || 0) * item.quantity).toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveFromCart(item._id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Subtotal: ${calculateTotal().toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Shipping: $0.00
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  Total: ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>

              {cartItems.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => setOrderDialogOpen(true)}
                  startIcon={<ShoppingCart />}
                >
                  Place Order
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Recent Orders
              </Typography>
              
              {orders.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No orders yet
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {orders.slice(0, 3).map((order) => (
                    <Box key={order._id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          Order #{order._id}
                        </Typography>
                        <Chip
                          icon={getStatusIcon(order.status)}
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {order.items.length} items • ${order.total_amount.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(order.order_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Place Order Dialog */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Shipping Address"
            multiline
            rows={3}
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            sx={{ mt: 2 }}
            placeholder="Enter your complete shipping address"
          />
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Selected Items:
            </Typography>
            {cartItems.map((item) => (
              <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2">
                  {item.product?.name} x {item.quantity}
                </Typography>
                <Typography variant="body2" color="primary">
                  ${((item.product?.sale_price || 0) * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total:
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handlePlaceOrder}
            variant="contained"
            disabled={isPlacingOrder || !shippingAddress.trim()}
            startIcon={isPlacingOrder ? <CircularProgress size={20} /> : <ShoppingCart />}
          >
            {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyOrdersPage;