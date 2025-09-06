"use client"
import Image from 'next/image';
import { 
    Box, 
    Button, 
    Typography, 
    Card, 
    CardContent, 
    Grid, 
    Chip, 
    IconButton, 
    Tooltip,
    TextField,
    InputAdornment,
    Paper,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    LinearProgress,
    useTheme,
    useMediaQuery,
    Stack,
    Divider,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    Checkbox,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Rating,
    CardActions,
    Collapse,
    IconButton as MuiIconButton
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { 
    Edit, 
    Delete, 
    Visibility, 
    Search, 
    FilterList, 
    Add,
    MoreVert,
    Inventory,
    AttachMoney,
    LocalShipping,
    Star,
    ShoppingCart,
    Favorite,
    Share,
    TrendingUp,
    TrendingDown,
    CheckCircle,
    Warning,
    Error,
    Category,
    Sort,
    KeyboardArrowDown,
    KeyboardArrowUp
} from '@mui/icons-material';
import { toast } from 'sonner';
import Link from 'next/link';

interface Product {
    _id: string;
    name: string;
    category: string;
    image: string;
    regular_price: number;
    sale_price: number;
    discount: number;
    stock: number;
    rating: number;
    description?: string;
    flashsale?: boolean;
}

type Order = 'asc' | 'desc';

interface HeadCell {
    id: string;
    label: string;
    numeric: boolean;
    sortable: boolean;
}

const headCells: HeadCell[] = [
    { id: 'image', label: 'Image', numeric: false, sortable: false },
    { id: 'name', label: 'Product Name', numeric: false, sortable: true },
    { id: 'category', label: 'Category', numeric: false, sortable: true },
    { id: 'regular_price', label: 'Price', numeric: true, sortable: true },
    { id: 'stock', label: 'Stock', numeric: true, sortable: true },
    { id: 'rating', label: 'Rating', numeric: true, sortable: true },
    { id: 'flashsale', label: 'Flash Sale', numeric: false, sortable: true },
    { id: 'actions', label: 'Actions', numeric: false, sortable: false },
];

const ProductShowPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Product>('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [expandedRows, setExpandedRows] = useState<readonly string[]>([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://tech-rubix-backend.vercel.app/top-products', {
                    next: {
                        revalidate: 1
                    }
                });
                const data = await res.json();
                const newData = data?.map((d: any) => ({ ...d, id: d?._id }));
                setProducts(newData);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`https://tech-rubix-backend.vercel.app/delete-product/${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                setProducts(prev => prev.filter(product => product._id !== id));
                toast.success('Product deleted successfully');
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
            toast.error('Failed to delete product');
        }
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    const handleUpdate = async (id: string, updatedData: any) => {
        try {
            const response = await fetch(`https://tech-rubix-backend.vercel.app/update-product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            
            if (response.ok) {
                setProducts(prev => 
                    prev.map(product => 
                        product._id === id ? { ...product, ...updatedData } : product
                    )
                );
                toast.success('Product updated successfully');
            } else {
                toast.error('Failed to update product');
            }
        } catch (error) {
            console.error('Failed to update product:', error);
            toast.error('Failed to update product');
        }
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, productId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedProductId(productId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProductId(null);
    };

    const handleDeleteClick = (productId: string) => {
        setProductToDelete(productId);
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleRequestSort = (property: keyof Product) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = filteredProducts.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleExpandRow = (productId: string) => {
        const newExpanded = expandedRows.includes(productId)
            ? expandedRows.filter(id => id !== productId)
            : [...expandedRows, productId];
        setExpandedRows(newExpanded);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return order === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return order === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
            return order === 'asc' ? (aValue ? 1 : -1) : (bValue ? -1 : 1);
        }
        
        return 0;
    });

    const paginatedProducts = sortedProducts.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { label: 'Out of Stock', color: 'error' as const };
        if (stock < 10) return { label: 'Low Stock', color: 'warning' as const };
        return { label: 'In Stock', color: 'success' as const };
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <LinearProgress sx={{ mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Loading products...
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 2, sm: 0 },
                    mb: 3 
                }}>
                    <Box>
                        <Typography 
                            variant={isMobile ? "h5" : "h4"} 
                            component="h1" 
                            sx={{ 
                                fontWeight: 700, 
                                mb: 1,
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                            }}
                        >
                            Product Management
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                        >
                            Manage your store&apos;s product inventory
                        </Typography>
                    </Box>
                    <Button
                        component={Link}
                        href="/dashboard/admin/products/add-products"
                        variant="contained"
                        startIcon={<Add />}
                        sx={{ 
                            minWidth: { xs: '100%', sm: 160 },
                            width: { xs: '100%', sm: 'auto' },
                            height: { xs: 44, sm: 36 }
                        }}
                    >
                        Add Product
                    </Button>
                </Box>

                {/* Search and Filters */}
                <Paper sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    mb: 3,
                    borderRadius: { xs: 2, sm: 1 }
                }}>
                    <Grid container spacing={{ xs: 2, sm: 2 }} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                size={isMobile ? "small" : "medium"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search fontSize={isMobile ? "small" : "medium"} />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                select
                                label="Category"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                size={isMobile ? "small" : "medium"}
                                SelectProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Category fontSize={isMobile ? "small" : "medium"} />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Box sx={{ 
                                display: 'flex', 
                                gap: 1, 
                                justifyContent: { xs: 'center', md: 'flex-end' },
                                mt: { xs: 1, md: 0 }
                            }}>
                                <Chip
                                    label={`${filteredProducts.length} products`}
                                    color="primary"
                                    variant="outlined"
                                    size={isMobile ? "small" : "medium"}
                                    sx={{
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            {/* Products Table */}
            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < filteredProducts.length}
                                        checked={filteredProducts.length > 0 && selected.length === filteredProducts.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all products',
                                        }}
                                    />
                                </TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding="normal"
                                        sortDirection={headCell.sortable && orderBy === (headCell.id as keyof Product) ? order : false}
                                    >
                                        {headCell.sortable ? (
                                            <TableSortLabel
                                                active={orderBy === (headCell.id as keyof Product)}
                                                direction={orderBy === (headCell.id as keyof Product) ? order : 'asc'}
                                                onClick={() => handleRequestSort(headCell.id as keyof Product)}
                                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                            >
                                                {headCell.id === 'image' && <Inventory />}
                                                {headCell.id === 'name' && <Category />}
                                                {headCell.id === 'category' && <Category />}
                                                {headCell.id === 'regular_price' && <AttachMoney />}
                                                {headCell.id === 'stock' && <Inventory />}
                                                {headCell.id === 'rating' && <Star />}
                                                {headCell.id === 'flashsale' && <LocalShipping />}
                                                {headCell.id === 'actions' && <MoreVert />}
                                                {headCell.label}
                                            </TableSortLabel>
                                        ) : (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {headCell.id === 'image' && <Inventory />}
                                                {headCell.id === 'name' && <Category />}
                                                {headCell.id === 'category' && <Category />}
                                                {headCell.id === 'regular_price' && <AttachMoney />}
                                                {headCell.id === 'stock' && <Inventory />}
                                                {headCell.id === 'rating' && <Star />}
                                                {headCell.id === 'flashsale' && <LocalShipping />}
                                                {headCell.id === 'actions' && <MoreVert />}
                                                {headCell.label}
                                            </Box>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedProducts.map((product, index) => {
                                const isItemSelected = isSelected(product._id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const stockStatus = getStockStatus(product.stock);
                                const isExpanded = expandedRows.includes(product._id);

                                return (
                                    <React.Fragment key={product._id}>
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, product._id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Avatar
                                                    src={product.image}
                                                    alt={product.name}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row">
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {product.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={product.category} 
                                                    size="small" 
                        color="primary"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        ${product.regular_price}
                                                    </Typography>
                                                    {product.sale_price && product.sale_price !== product.regular_price && (
                                                        <Typography 
                                                            variant="caption" 
                                                            color="text.secondary" 
                                                            sx={{ textDecoration: 'line-through' }}
                                                        >
                                                            ${product.sale_price}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                {product.discount > 0 && (
                                                    <Chip
                                                        label={`${product.discount}% OFF`}
                                                        color="success"
                                                        size="small"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={stockStatus.label}
                                                    color={stockStatus.color}
                                                    size="small"
                                                />
                                                <Typography variant="caption" display="block" color="text.secondary">
                                                    {product.stock} units
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Rating value={product.rating || 0} readOnly size="small" />
                                            </TableCell>
                                            <TableCell>
                                                {product.flashsale ? (
                                                    <Chip
                                                        label="Yes"
                                                        color="warning"
                                                        size="small"
                                                        icon={<LocalShipping />}
                                                    />
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">No</Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Tooltip title="View Details">
                                                        <IconButton
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedProduct(product);
                                                            }}
                                                        >
                                                            <Visibility />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit Product">
                                                        <IconButton
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUpdate(product._id, product);
                                                            }}
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="More Actions">
                                                        <IconButton
                        size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMenuClick(e, product._id);
                                                            }}
                                                        >
                                                            <MoreVert />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 2 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            Product Details
                                                        </Typography>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={6}>
                                                                <Image 
                                                                    src={product.image} 
                                                                    alt={product.name}
                                                                    width={400}
                                                                    height={200}
                                                                    style={{ 
                                                                        width: '100%', 
                                                                        height: '200px', 
                                                                        objectFit: 'cover',
                                                                        borderRadius: '8px'
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                                    {product.description || 'No description available'}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                                    <Chip 
                                                                        label={`Stock: ${product.stock}`} 
                                                                        color={stockStatus.color} 
                                                                    />
                                                                    {product.discount > 0 && (
                                                                        <Chip label={`${product.discount}% OFF`} color="success" />
                                                                    )}
                                                                    {product.flashsale && (
                                                                        <Chip label="Flash Sale" color="warning" />
                                                                    )}
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            {filteredProducts.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Inventory sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No products found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Try adjusting your search or filter criteria
                    </Typography>
                    <Button
                        component={Link}
                        href="/dashboard/admin/products/add-products"
                        variant="contained"
                        startIcon={<Add />}
                    >
                        Add Your First Product
                    </Button>
                </Box>
            )}

            {/* Product Details Dialog */}
            <Dialog 
                open={!!selectedProduct} 
                onClose={() => setSelectedProduct(null)}
                maxWidth="md"
                fullWidth
            >
                {selectedProduct && (
                    <>
                        <DialogTitle>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar src={selectedProduct.image} sx={{ width: 48, height: 48 }} />
                                <Box>
                                    <Typography variant="h6">{selectedProduct.name}</Typography>
                                    <Chip label={selectedProduct.category} color="primary" size="small" />
                                </Box>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Image 
                                        src={selectedProduct.image} 
                                        alt={selectedProduct.name}
                                        width={400}
                                        height={200}
                                        style={{ 
                                            width: '100%', 
                                            height: '200px', 
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography variant="h6" color="primary">
                                                ${selectedProduct.regular_price}
                                            </Typography>
                                            {selectedProduct.sale_price && (
                                                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                    ${selectedProduct.sale_price}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            <Chip 
                                                label={`Stock: ${selectedProduct.stock}`} 
                                                color={selectedProduct.stock > 10 ? 'success' : 'warning'} 
                                            />
                                            {selectedProduct.discount > 0 && (
                                                <Chip label={`${selectedProduct.discount}% OFF`} color="success" />
                                            )}
                                            {selectedProduct.flashsale && (
                                                <Chip label="Flash Sale" color="warning" />
                                            )}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {selectedProduct.description}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedProduct(null)}>Close</Button>
                    <Button
                        variant="contained"
                                startIcon={<Edit />}
                                onClick={() => {
                                    handleUpdate(selectedProduct._id, selectedProduct);
                                    setSelectedProduct(null);
                                }}
                            >
                                Edit Product
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    const product = products.find(p => p._id === selectedProductId);
                    if (product) setSelectedProduct(product);
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <Visibility fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Details</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    const product = products.find(p => p._id === selectedProductId);
                    if (product) handleUpdate(product._id, product);
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit Product</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedProductId) handleDeleteClick(selectedProductId);
                }}>
                    <ListItemIcon>
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete Product</ListItemText>
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this product? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={() => productToDelete && handleDelete(productToDelete)}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default ProductShowPage