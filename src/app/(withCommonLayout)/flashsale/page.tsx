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
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Slider, 
  FormControlLabel, 
  Checkbox, 
  Stack, 
  Divider, 
  Skeleton,
  Alert,
  useTheme,
  useMediaQuery,
  Fab,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  Badge,
  Chip,
  IconButton,
  Drawer,
  Pagination
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { 
  FilterList, 
  Search, 
  ShoppingCart, 
  Close,
  Sort,
  ExpandMore,
  Clear,
  Tune
} from '@mui/icons-material';
import { toast } from 'sonner';

const FlashProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [discountRange, setDiscountRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(true);
  const [expandedFilter, setExpandedFilter] = useState('price');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const categories = [
    'all', 'motherboard', 'graphics card', 'powersupply', 'monitor', 
    'mouse', 'keyboard', 'headphone', 'ssd', 'hdd', 'cpu', 'ram', 'case', 'cooling'
  ];

  const brands = [
    'NVIDIA', 'AMD', 'Intel', 'ASUS', 'MSI', 'Gigabyte', 'EVGA', 'Corsair', 
    'Samsung', 'Western Digital', 'Seagate', 'Logitech', 'Razer', 'SteelSeries'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'discount', label: 'Highest Discount' },
    { value: 'name', label: 'Name A-Z' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://tech-rubix-backend.vercel.app/flash-products?page=${page}`);
        const result = await response.json();
        setProducts(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  // Filter and sort products
  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.regular_price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Discount filter
    filtered = filtered.filter(product => {
      const discount = product.discount || 0;
      return discount >= discountRange[0] && discount <= discountRange[1];
    });

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.some(brand =>
          product.name.toLowerCase().includes(brand.toLowerCase())
        )
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.regular_price || 0) - (b.regular_price || 0);
        case 'price-high':
          return (b.regular_price || 0) - (a.regular_price || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        case 'rating':
          // Mock rating for demo - in real app this would come from API
          return Math.random() - Math.random();
        case 'newest':
        default:
          return 0; // Keep original order for newest
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, discountRange, inStockOnly, selectedBrands, sortBy]);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handleAddToCart = (product: any) => {
    toast.success(`${product.name} added to cart!`);
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev: string[]) => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategory('all');
    setRatingRange([0, 5]);
    setInStockOnly(false);
    setSearchQuery('');
    setSelectedBrands([]);
    setDiscountRange([0, 100]);
    setSortBy('newest');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 5000) count++;
    if (selectedCategory !== 'all') count++;
    if (ratingRange[0] > 0 || ratingRange[1] < 5) count++;
    if (inStockOnly) count++;
    if (searchQuery) count++;
    if (selectedBrands.length > 0) count++;
    if (discountRange[0] > 0 || discountRange[1] < 100) count++;
    return count;
  };

  const FilterSidebar = () => (
    <Box sx={{ width: 320, p: 3, height: 'fit-content' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tune />
          Filters
        </Typography>
        <Button
          size="small"
          onClick={clearAllFilters}
          startIcon={<Clear />}
          sx={{ color: 'text.secondary' }}
        >
          Clear All
        </Button>
      </Box>
      
      <Stack spacing={3}>
        {/* Search */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Search Products
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Divider />

        {/* Price Range */}
        <Accordion 
          expanded={expandedFilter === 'price'} 
          onChange={() => setExpandedFilter(expandedFilter === 'price' ? '' : 'price')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Price Range
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                step={50}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption">{formatPrice(priceRange[0])}</Typography>
                <Typography variant="caption">{formatPrice(priceRange[1])}</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Category */}
        <Accordion 
          expanded={expandedFilter === 'category'} 
          onChange={() => setExpandedFilter(expandedFilter === 'category' ? '' : 'category')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth size="small">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        {/* Brands */}
        <Accordion 
          expanded={expandedFilter === 'brands'} 
          onChange={() => setExpandedFilter(expandedFilter === 'brands' ? '' : 'brands')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Brands
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {brands.map((brand) => (
                <Chip
                  key={brand}
                  label={brand}
                  size="small"
                  clickable
                  color={selectedBrands.includes(brand) ? 'primary' : 'default'}
                  onClick={() => handleBrandToggle(brand)}
                  variant={selectedBrands.includes(brand) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Discount Range */}
        <Accordion 
          expanded={expandedFilter === 'discount'} 
          onChange={() => setExpandedFilter(expandedFilter === 'discount' ? '' : 'discount')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Discount Range
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Slider
                value={discountRange}
                onChange={(e, newValue) => setDiscountRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                step={5}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption">{discountRange[0]}%</Typography>
                <Typography variant="caption">{discountRange[1]}%</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Rating Range */}
        <Accordion 
          expanded={expandedFilter === 'rating'} 
          onChange={() => setExpandedFilter(expandedFilter === 'rating' ? '' : 'rating')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Rating Range
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Slider
                value={ratingRange}
                onChange={(e, newValue) => setRatingRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.5}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption">{ratingRange[0]} stars</Typography>
                <Typography variant="caption">{ratingRange[1]} stars</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* In Stock Only */}
        <FormControlLabel
          control={
            <Checkbox
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
          }
          label="In Stock Only"
        />
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Mobile Filter FAB */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}
          onClick={() => setFilterDrawerOpen(true)}
        >
          <Badge badgeContent={getActiveFiltersCount()} color="error">
            <FilterList />
          </Badge>
        </Fab>
      )}

      {/* Filter Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <FilterSidebar />
      </Drawer>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Desktop Sidebar */}
          {!isMobile && showFilters && (
            <Box sx={{ width: 320, flexShrink: 0 }}>
              <FilterSidebar />
            </Box>
          )}

          {/* Main Content */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Flash Sale Products
                </Typography>
                {!isMobile && (
                  <Button
                    variant="outlined"
                    startIcon={<Tune />}
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{ minWidth: 120 }}
                  >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                )}
              </Box>
              <Typography variant="body1" color="text.secondary">
                Showing {filteredAndSortedProducts.length} of {products.length} products
                {getActiveFiltersCount() > 0 && ` (${getActiveFiltersCount()} filters applied)`}
              </Typography>
            </Box>

            {/* Sort and View Options */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexWrap: 'wrap',
              gap: 2,
              p: 2,
              backgroundColor: 'grey.50',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Sort by:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    displayEmpty
                    sx={{
                      backgroundColor: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.dark'
                      }
                    }}
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Sort fontSize="small" />
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {isMobile ? (
                  <Button
                    variant="contained"
                    startIcon={<FilterList />}
                    onClick={() => setFilterDrawerOpen(true)}
                    sx={{
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark'
                      }
                    }}
                  >
                    Filters ({getActiveFiltersCount()})
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<Tune />}
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{ minWidth: 140 }}
                  >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                )}
              </Box>
            </Box>

            {/* Error State */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {loading ? (
              <Grid container spacing={3}>
                {[...Array(8)].map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card>
                      <Skeleton variant="rectangular" height={200} />
                      <CardContent>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={20} />
                        <Skeleton variant="text" height={20} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <>
                {/* Products Grid */}
                <Grid container spacing={3}>
                  {filteredAndSortedProducts.map((product: any) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                      <Link href={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
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
                              borderColor: 'primary.main'
                            }
                          }}
                        >
                          {/* Image Container */}
                          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                            <Box
                              sx={{
                                position: 'relative',
                                height: { xs: 160, sm: 180, md: 200 },
                                overflow: 'hidden'
                              }}
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500"
                                style={{ objectFit: 'cover' }}
                              />
                              
                              {/* Discount Badge */}
                              {product?.discount > 0 && (
                                <Chip
                                  label={`-${product.discount}%`}
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
                            </Box>
                          </Box>

                          {/* Card Content */}
                          <CardContent sx={{ flexGrow: 1, p: 2 }}>
                            <Stack spacing={1.5}>
                              {/* Category Badge */}
                              <Chip
                                label={product.category}
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
                                {product.name}
                              </Typography>

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
                                  {formatPrice(product.regular_price)}
                                </Typography>
                              </Box>

                              {/* Stock Info */}
                              <Typography variant="caption" color="text.secondary">
                                Stock: {product.stock} units
                              </Typography>

                              {/* Add to Cart Button */}
                              <Button
                                variant="contained"
                                startIcon={<ShoppingCart />}
                                fullWidth
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleAddToCart(product);
                                }}
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
                      </Link>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default FlashProductsPage
