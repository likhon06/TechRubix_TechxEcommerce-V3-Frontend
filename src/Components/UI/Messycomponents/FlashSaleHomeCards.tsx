"use client"
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button, 
  IconButton, 
  Stack, 
  useTheme, 
  useMediaQuery,
  Rating,
  Divider
} from '@mui/material'
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ShoppingCart, FavoriteBorder, Visibility, LocalShipping } from '@mui/icons-material';
import { toast } from 'sonner';

const FlashSaleHomeCards = ({ fdata }: { fdata: any }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const storedToken = localStorage.getItem('Token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken: {
          email: string;
        } = jwtDecode(storedToken);
        setUserEmail(decodedToken.email);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!token) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    toast.success(`${fdata.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Added to wishlist!');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${fdata._id}`);
  };

  const displayPrice = fdata?.sale_price === 0 ? fdata.regular_price : fdata.sale_price;
  const originalPrice = fdata?.sale_price > 0 ? fdata.regular_price : null;
  const discountPercentage = fdata?.discount || 0;
  const rating = Math.random() * 2 + 3; // Random rating between 3-5 for demo

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          borderColor: 'primary.main',
          '& .product-image': {
            transform: 'scale(1.05)'
          },
          '& .action-buttons': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
    >
      {/* Image Container */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: 140, sm: 150, md: 160 },
            overflow: 'hidden'
          }}
        >
          <Image
            src={fdata.image}
            alt={fdata.name}
            fill
            className="product-image object-cover transition-transform duration-500"
            style={{ objectFit: 'cover' }}
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Chip
              label={`-${discountPercentage}%`}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: 'error.main',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.7rem',
                zIndex: 2,
                height: 24
              }}
            />
          )}

          {/* Action Buttons */}
          <Box
            className="action-buttons"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 0.5,
              opacity: 0,
              transform: 'translateY(-8px)',
              transition: 'all 0.3s ease-in-out',
              zIndex: 3
            }}
          >
            <IconButton
              size="small"
              onClick={handleWishlist}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: 'text.primary',
                width: 32,
                height: 32,
                '&:hover': {
                  backgroundColor: 'error.main',
                  color: 'white',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <FavoriteBorder fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleQuickView}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: 'text.primary',
                width: 32,
                height: 32,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Stack spacing={1.5}>
          {/* Category Badge */}
          <Chip
            label={fdata.category}
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              alignSelf: 'flex-start',
              fontSize: '0.7rem',
              height: 24
            }}
          />

          {/* Product Name */}
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: '0.95rem',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
              color: 'text.primary'
            }}
          >
            {fdata.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating
              value={rating}
              precision={0.1}
              size="small"
              readOnly
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'warning.main'
                },
                fontSize: '0.8rem'
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              ({Math.floor(Math.random() * 50 + 20)})
            </Typography>
          </Box>

          {/* Price Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.1rem'
              }}
            >
              {formatPrice(displayPrice)}
            </Typography>
            {originalPrice && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'line-through',
                  fontSize: '0.8rem'
                }}
              >
                {formatPrice(originalPrice)}
              </Typography>
            )}
          </Box>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            fullWidth
            onClick={handleAddToCart}
            sx={{
              borderRadius: 1.5,
              py: 1,
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'none',
              mt: 'auto'
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FlashSaleHomeCards