"use client"
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
    Badge,
    Menu,
    MenuItem,
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
    ListItemIcon,
    ListItemText,
    Collapse
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { 
    Edit, 
    Delete, 
    Visibility, 
    Search, 
    FilterList, 
    MoreVert,
    AdminPanelSettings,
    Person,
    Email,
    Phone,
    LocationOn,
    CalendarToday,
    Block,
    CheckCircle
} from '@mui/icons-material';
import { toast } from 'sonner';

interface User {
    id: string;
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
    created_at?: string;
    last_login?: string;
    is_active?: boolean;
}

type Order = 'asc' | 'desc';

interface HeadCell {
    id: string;
    label: string;
    numeric: boolean;
    sortable: boolean;
}

const headCells: HeadCell[] = [
    { id: 'first_name', label: 'User', numeric: false, sortable: true },
    { id: 'email', label: 'Email', numeric: false, sortable: true },
    { id: 'role', label: 'Role', numeric: false, sortable: true },
    { id: 'phone', label: 'Phone', numeric: false, sortable: false },
    { id: 'created_at', label: 'Joined', numeric: false, sortable: true },
    { id: 'is_active', label: 'Status', numeric: false, sortable: true },
    { id: 'actions', label: 'Actions', numeric: false, sortable: false },
];

const AllUsersPage = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof User>('first_name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [expandedRows, setExpandedRows] = useState<readonly string[]>([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://tech-rubix-backend.vercel.app/all-users', {
                    next: {
                        revalidate: 1
                    }
                });
                const data = await res.json();
                const newData = data?.map((d: any) => ({ ...d, id: d?._id }));
                setAllUsers(newData);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            console.log('Attempting to delete user with ID:', id);
            
            const response = await fetch(`https://tech-rubix-backend.vercel.app/admin/user-delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log('Delete response status:', response.status);
            console.log('Delete response ok:', response.ok);
            
            if (response.ok) {
                setAllUsers(prev => prev.filter(user => user.id !== id));
                toast.success('User deleted successfully');
            } else {
                const errorData = await response.text();
                console.error('Delete failed - Status:', response.status);
                console.error('Delete failed - Response:', errorData);
                toast.error(`Failed to delete user: ${response.status} - ${errorData}`);
            }
        } catch (error: any) {
            console.error('Failed to delete user:', error);
            toast.error(`Failed to delete user: ${error?.message || 'Unknown error'}`);
        }
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleUpdate = async (id: string, updatedData: any) => {
        try {
            const response = await fetch(`https://tech-rubix-backend.vercel.app/update-user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            
            if (response.ok) {
                setAllUsers(prev => 
                    prev.map(user => 
                        user.id === id ? { ...user, ...updatedData } : user
                    )
                );
                toast.success('User updated successfully');
            } else {
                toast.error('Failed to update user');
            }
        } catch (error) {
            console.error('Failed to update user:', error);
            toast.error('Failed to update user');
        }
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    const handleDeleteClick = (id: string) => {
        setUserToDelete(id);
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleRoleToggle = (id: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        handleUpdate(id, { role: newRole });
        handleMenuClose();
    };

    const handleRequestSort = (property: keyof User) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = filteredUsers.map((n) => n.id);
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

    const filteredUsers = allUsers.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return order === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
            return order === 'asc' ? (aValue ? 1 : -1) : (bValue ? -1 : 1);
        }
        
        return 0;
    });

    const paginatedUsers = sortedUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const adminCount = allUsers.filter(user => user.role === 'admin').length;
    const userCount = allUsers.filter(user => user.role === 'user').length;
    const activeCount = allUsers.filter(user => user.role === 'admin' || user.is_active !== false).length;

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <LinearProgress sx={{ mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Loading users...
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                            User Management
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        Manage your store&apos;s users and their permissions
                        </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ backgroundColor: 'primary.main' }}>
                                    <Person />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6">{userCount}</Typography>
                                    <Typography variant="body2" color="text.secondary">Regular Users</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ backgroundColor: 'warning.main' }}>
                                    <AdminPanelSettings />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6">{adminCount}</Typography>
                                    <Typography variant="body2" color="text.secondary">Administrators</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ backgroundColor: 'success.main' }}>
                                    <CheckCircle />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6">{activeCount}</Typography>
                                    <Typography variant="body2" color="text.secondary">Active Users</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Search and Filters */}
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<FilterList />}
                                    sx={{ minWidth: 120 }}
                                >
                                    Filters
                                </Button>
                                <Chip
                                    label={`${filteredUsers.length} users`}
                                    color="primary"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            {/* Users Table */}
            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < filteredUsers.length}
                                        checked={filteredUsers.length > 0 && selected.length === filteredUsers.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all users',
                                        }}
                                    />
                                </TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding="normal"
                                        sortDirection={headCell.sortable && orderBy === (headCell.id as keyof User) ? order : false}
                                    >
                                        {headCell.sortable ? (
                                            <TableSortLabel
                                                active={orderBy === (headCell.id as keyof User)}
                                                direction={orderBy === (headCell.id as keyof User) ? order : 'asc'}
                                                onClick={() => handleRequestSort(headCell.id as keyof User)}
                                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                            >
                                                {headCell.id === 'first_name' && <Person />}
                                                {headCell.id === 'email' && <Email />}
                                                {headCell.id === 'role' && <AdminPanelSettings />}
                                                {headCell.id === 'phone' && <Phone />}
                                                {headCell.id === 'created_at' && <CalendarToday />}
                                                {headCell.id === 'is_active' && <CheckCircle />}
                                                {headCell.id === 'actions' && <MoreVert />}
                                                {headCell.label}
                                            </TableSortLabel>
                                        ) : (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {headCell.id === 'first_name' && <Person />}
                                                {headCell.id === 'email' && <Email />}
                                                {headCell.id === 'role' && <AdminPanelSettings />}
                                                {headCell.id === 'phone' && <Phone />}
                                                {headCell.id === 'created_at' && <CalendarToday />}
                                                {headCell.id === 'is_active' && <CheckCircle />}
                                                {headCell.id === 'actions' && <MoreVert />}
                                                {headCell.label}
                                            </Box>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user, index) => {
                                const isItemSelected = isSelected(user.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

    return (
                                    <TableRow
                                        key={user.id}
                                        hover
                                        onClick={(event) => handleClick(event, user.id)}
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
                                        <TableCell component="th" id={labelId} scope="row">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    sx={{ 
                                                        width: 40, 
                                                        height: 40,
                                                        backgroundColor: user.role === 'admin' ? 'primary.main' : 'secondary.main'
                                                    }}
                                                >
                                                    {user.first_name?.[0]}{user.last_name?.[0]}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                        {user.first_name} {user.last_name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {user.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.role}
                                                color={user.role === 'admin' ? 'primary' : 'default'}
                                                size="small"
                                                icon={user.role === 'admin' ? <AdminPanelSettings /> : <Person />}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {user.phone || '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption" color="text.secondary">
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.role === 'admin' ? 'Active' : (user.is_active ? 'Active' : 'Inactive')}
                                                color={user.role === 'admin' ? 'success' : (user.is_active ? 'success' : 'error')}
                                                size="small"
                                                icon={user.role === 'admin' ? <CheckCircle /> : (user.is_active ? <CheckCircle /> : <Block />)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Tooltip title="View Details">
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedUser(user);
                                                        }}
                                                    >
                                                        <Visibility />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit User">
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUpdate(user._id, user);
                                                        }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete User">
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(user.id);
                                                        }}
                                                        disabled={user.role === 'admin'}
                                                        sx={{
                                                            color: user.role === 'admin' ? 'text.disabled' : 'error.main',
                                                            '&:hover': {
                                                                backgroundColor: user.role === 'admin' ? 'transparent' : 'error.50'
                                                            }
                                                        }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            {filteredUsers.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Person sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No users found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try adjusting your search criteria
                    </Typography>
                </Box>
            )}

            {/* User Details Dialog */}
            <Dialog 
                open={!!selectedUser} 
                onClose={() => setSelectedUser(null)}
                maxWidth="md"
                fullWidth
            >
                {selectedUser && (
                    <>
                        <DialogTitle>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar 
                                    sx={{ 
                                        width: 48, 
                                        height: 48,
                                        backgroundColor: selectedUser.role === 'admin' ? 'primary.main' : 'secondary.main'
                                    }}
                                >
                                    {selectedUser.first_name?.[0]}{selectedUser.last_name?.[0]}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6">
                                        {selectedUser.first_name} {selectedUser.last_name}
                                    </Typography>
                                    <Chip 
                                        label={selectedUser.role} 
                                        color={selectedUser.role === 'admin' ? 'primary' : 'default'} 
                                        size="small" 
                                    />
                                </Box>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Email color="action" />
                                            <Typography variant="body2">{selectedUser.email}</Typography>
                                        </Box>
                                        {selectedUser.phone && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Phone color="action" />
                                                <Typography variant="body2">{selectedUser.phone}</Typography>
                                            </Box>
                                        )}
                                        {selectedUser.address && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationOn color="action" />
                                                <Typography variant="body2">{selectedUser.address}</Typography>
                                            </Box>
                                        )}
                                        {selectedUser.created_at && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarToday color="action" />
                                                <Typography variant="body2">
                                                    Joined: {new Date(selectedUser.created_at).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        <Chip 
                                            label={selectedUser.role === 'admin' ? 'Active' : (selectedUser.is_active ? 'Active' : 'Inactive')} 
                                            color={selectedUser.role === 'admin' ? 'success' : (selectedUser.is_active ? 'success' : 'error')} 
                                        />
                                        <Chip 
                                            label={selectedUser.role === 'admin' ? 'Administrator' : 'User'} 
                                            color={selectedUser.role === 'admin' ? 'primary' : 'default'} 
            />
        </Box>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedUser(null)}>Close</Button>
                            <Button 
                                variant="contained" 
                                startIcon={<Edit />}
                                onClick={() => {
                                    handleUpdate(selectedUser.id, selectedUser);
                                    setSelectedUser(null);
                                }}
                            >
                                Edit User
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this user? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={() => userToDelete && handleDelete(userToDelete)}
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

export default AllUsersPage