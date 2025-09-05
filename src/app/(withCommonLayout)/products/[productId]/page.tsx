"use client"
import { AddCart } from '@/Components/AddProductIntoCart/AddCart';
import { Rating, Container, Grid, Card, CardContent, Typography, Button, Box, Chip, Divider, Stack, IconButton, TextField, Paper, Breadcrumbs, Link as MuiLink, Skeleton, Alert, useTheme, useMediaQuery, Fade, Zoom, Badge } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface JwtPayload {
  email: string
  role: string
}

const ProductIdPage = ({ params }: { params: any }) => {
  const [singleProduct, setSingleProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://tech-rubix-backend.vercel.app/products/${params?.productId}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const product = await res.json();
        setSingleProduct(product);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params?.productId]);

  const handleItemAddIntoCart = async (id: any, name: any) => {
    setAddingToCart(true);
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      const EmailSet = decodedToken?.email;
      const Role = decodedToken?.role;
      const datas = {
        email: EmailSet,
        product_id: id,
        quantity: quantity
      }

      if (Role !== 'admin') {
        const res = await AddCart(datas);
        if (res.result.acknowledged === true) {
          toast.success(`${name} added to your cart successfully`)
        } else {
          toast.error(`something went wrong!`);
        }
      }else{
        toast.error('You are Admin, You dont need to buy!');
      }
    } else {
      toast.error('Please login to add items to cart')
    }
    setAddingToCart(false);
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (singleProduct?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} md={6}>
            <Skeleton 
              variant="rectangular" 
              sx={{ 
                borderRadius: 2, 
                height: { xs: 300, md: 500 }
              }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Skeleton variant="text" height={40} />
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="rectangular" height={50} />
              <Skeleton variant="rectangular" height={60} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !singleProduct) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Product not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ 
          mb: { xs: 2, md: 3 },
          '& .MuiBreadcrumbs-separator': {
            mx: { xs: 0.5, md: 1 }
          }
        }}
      >
        <MuiLink 
          component={Link} 
          href="/" 
          color="inherit" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          <HomeIcon fontSize="small" />
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Home</Box>
        </MuiLink>
        <MuiLink 
          component={Link} 
          href="/products" 
          color="inherit" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          <CategoryIcon fontSize="small" />
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Products</Box>
        </MuiLink>
        <Typography 
          color="text.primary" 
          sx={{ 
            fontSize: { xs: '0.875rem', md: '1rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: { xs: 150, sm: 'none' }
          }}
        >
          {singleProduct?.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Fade in={imageLoaded} timeout={600}>
            <Card 
              elevation={0} 
              sx={{ 
                border: 1, 
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                <Box 
                  sx={{ 
                    position: 'relative', 
                    aspectRatio: '1', 
                    borderRadius: 1, 
                    overflow: 'hidden',
                    bgcolor: 'grey.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {!imageLoaded && (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                  )}
          <Image
            src={singleProduct.image}
                    fill
                    alt={singleProduct?.name}
                    style={{ 
                      objectFit: 'cover',
                      opacity: imageLoaded ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                    priority
                    onLoad={() => setImageLoaded(true)}
                  />
                  {/* Sale Badge */}
                  {singleProduct?.sale_price > 0 && (
                    <Chip
                      label={`${Math.round((1 - singleProduct?.sale_price / singleProduct.regular_price) * 100)}% OFF`}
                      color="error"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        fontWeight: 600,
                        zIndex: 1
                      }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            {/* Product Title */}
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                component="h1" 
                fontWeight={700} 
                gutterBottom
                sx={{ 
                  lineHeight: 1.2,
                  mb: 1
                }}
              >
                {singleProduct?.name}
              </Typography>
              <Chip 
                label={singleProduct?.category} 
                color="primary" 
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{ fontWeight: 500 }}
              />
            </Box>

            {/* Price */}
            <Box>
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={{ xs: 1, sm: 2 }} 
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexWrap="wrap"
              >
                {singleProduct?.sale_price > 0 ? (
                  <>
                    <Typography 
                      variant={isMobile ? "h4" : "h3"} 
                      color="primary" 
                      fontWeight={700}
                      sx={{ lineHeight: 1 }}
                    >
                      ${singleProduct?.sale_price}
                    </Typography>
                    <Typography 
                      variant={isMobile ? "h6" : "h5"} 
                      color="text.secondary" 
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ${singleProduct.regular_price}
                    </Typography>
                    <Chip 
                      label={`Save $${(singleProduct.regular_price - singleProduct?.sale_price).toFixed(2)}`} 
                      color="success" 
                      size="small"
                      icon={<CheckCircleIcon />}
                    />
                  </>
                ) : (
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    color="primary" 
                    fontWeight={700}
                    sx={{ lineHeight: 1 }}
                  >
                    ${singleProduct.regular_price}
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Rating */}
            <Box>
              <Stack 
                direction="row" 
                spacing={1} 
                alignItems="center"
                flexWrap="wrap"
              >
                <Rating 
                  name="half-rating-read" 
                  defaultValue={singleProduct.rating} 
                  precision={0.5} 
                  readOnly
                  size={isMobile ? "small" : "medium"}
                />
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <StarIcon fontSize="small" />
                  {singleProduct.rating} ({singleProduct.rating} rating)
                </Typography>
              </Stack>
            </Box>

            {/* Stock Status */}
            <Box>
              <Chip 
                label={`${singleProduct?.stock} in stock`} 
                color={singleProduct?.stock > 0 ? 'success' : 'error'} 
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                icon={singleProduct?.stock > 0 ? <CheckCircleIcon /> : undefined}
              />
            </Box>

            {/* Quantity Selector */}
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Quantity
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    border: 1, 
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  inputProps={{ min: 1, max: singleProduct?.stock }}
                  sx={{ 
                    width: { xs: 70, md: 80 },
                    '& .MuiOutlinedInput-root': {
                      textAlign: 'center',
                      fontWeight: 600
                    }
                  }}
                  size={isMobile ? "small" : "medium"}
                />
                <IconButton 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= singleProduct?.stock}
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    border: 1, 
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Stack>
            </Box>

            {/* Action Buttons */}
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                size={isMobile ? "large" : "large"}
                startIcon={<ShoppingCartIcon />}
                onClick={() => handleItemAddIntoCart(singleProduct?._id, singleProduct?.name)}
                disabled={addingToCart || singleProduct?.stock === 0}
                sx={{ 
                  flex: 1,
                  minHeight: { xs: 48, md: 56 },
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button
                variant="outlined"
                size={isMobile ? "large" : "large"}
                startIcon={isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={() => setIsWishlisted(!isWishlisted)}
                sx={{ 
                  minWidth: { xs: 'auto', sm: 120 },
                  minHeight: { xs: 48, md: 56 },
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  }
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                </Box>
              </Button>
              <IconButton
                size={isMobile ? "medium" : "large"}
                sx={{ 
                  minHeight: { xs: 48, md: 56 },
                  minWidth: { xs: 48, md: 56 },
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <ShareIcon />
              </IconButton>
            </Stack>

            {/* Features */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, md: 3 }, 
                bgcolor: 'grey.50',
                borderRadius: 2,
                border: 1,
                borderColor: 'grey.200'
              }}
            >
              <Typography variant="subtitle2" fontWeight={600} gutterBottom color="text.secondary">
                Why choose us?
              </Typography>
              <Stack spacing={{ xs: 1.5, md: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <LocalShippingIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2" fontWeight={500}>
                    Free shipping on orders over $50
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: 'success.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <SecurityIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2" fontWeight={500}>
                    Secure payment with SSL encryption
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: 'info.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <RefreshIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2" fontWeight={500}>
                    30-day return policy
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Product Description */}
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mt: { xs: 3, md: 4 } }}>
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0} 
            sx={{ 
              border: 1, 
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                gutterBottom 
                fontWeight={600}
                sx={{ mb: 2 }}
              >
                About this {singleProduct?.category}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  lineHeight: 1.7,
                  color: 'text.secondary'
                }}
              >
                {singleProduct?.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              border: 1, 
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                gutterBottom 
                fontWeight={600}
                sx={{ mb: 2 }}
              >
                Product Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{ 
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: 'grey.50'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    Category:
                  </Typography>
                  <Chip 
                    label={singleProduct?.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{ 
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: 'grey.50'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    Stock:
                  </Typography>
                  <Chip 
                    label={`${singleProduct?.stock} items`} 
                    size="small" 
                    color={singleProduct?.stock > 0 ? 'success' : 'error'}
                    variant="outlined"
                  />
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{ 
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: 'grey.50'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    Rating:
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <StarIcon fontSize="small" color="warning" />
                    <Typography variant="body2" fontWeight={600}>
                      {singleProduct?.rating}/5
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Reviews Link */}
      <Box sx={{ mt: { xs: 3, md: 4 }, textAlign: 'center' }}>
        <Button
          component={Link}
          href={`/products/${params?.productId}/reviews`}
          variant="outlined"
          size={isMobile ? "large" : "large"}
          sx={{
            minWidth: { xs: 200, md: 250 },
            minHeight: { xs: 48, md: 56 },
            fontSize: { xs: '0.95rem', md: '1rem' },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2
            }
          }}
        >
          Read All Reviews
        </Button>
      </Box>
    </Container>
  )
}

export default ProductIdPage