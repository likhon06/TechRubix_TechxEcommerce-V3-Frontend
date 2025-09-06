"use client"
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { useAdminCheckQuery } from '@/redux/features/isadmin.check';
import { jwtDecode } from 'jwt-decode';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StoreIcon from '@mui/icons-material/Store';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Button, Chip } from '@mui/material';

// Create a context for drawer state
const DrawerContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: true,
  setOpen: () => {}
});

export const useDrawerContext = () => React.useContext(DrawerContext);
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

interface typeAdmin {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role?: string;
}

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export const DDrawer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [userEmail, setUserEmail] = React.useState<string | null>(null);
    const [userRole, setUserRole] = React.useState<string | null>(null);
    const [open, setOpen] = React.useState(true);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        const storedToken = localStorage.getItem('Token');
        if (storedToken) {
            try {
                const decodedToken: {
                    email: string;
                    role: string;
                } = jwtDecode(storedToken);
                setUserEmail(decodedToken?.email);
                setUserRole(decodedToken?.role);
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);
    
    const drawerContent = (
        <Box>
            <DrawerHeader>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%', 
                    px: 2,
                    justifyContent: (open || isMobile) ? 'space-between' : 'center'
                }}>
                    {(open || isMobile) && (
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {userRole === 'admin' ? 'Admin Panel' : 'User Panel'}
                        </Typography>
                    )}
                    {!isMobile && (
                        <IconButton
                            onClick={open ? handleDrawerClose : handleDrawerOpen} 
                            size="small"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'primary.dark'
                                }
                            }}
                        >
                            {open ? (
                                theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />
                            ) : (
                                theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />
                            )}
                        </IconButton>
                    )}
                </Box>
                </DrawerHeader>
                <Divider />
            
            {/* User Info - Show when drawer is open or on mobile */}
            {(open || isMobile) && (
                <>
                    <Box sx={{ p: 2, backgroundColor: 'grey.50' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Welcome back,
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            {userEmail}
                        </Typography>
                        <Chip 
                            label={userRole === 'admin' ? 'Administrator' : 'User'} 
                            color={userRole === 'admin' ? 'primary' : 'default'} 
                            size="small" 
                        />
                    </Box>
                    <Divider />
                </>
            )}

            {/* Navigation Menu */}
            {userRole === 'admin' ? (
                <List sx={{ px: 1 }}>
                    {[
                        { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard/admin' },
                        { text: 'Add Products', icon: <AddIcon />, href: '/dashboard/admin/products/add-products' },
                        { text: 'All Products', icon: <InventoryIcon />, href: '/dashboard/admin/products' },
                        { text: 'All Users', icon: <PeopleIcon />, href: '/dashboard/admin/all-users' },
                        { text: 'Analytics', icon: <AnalyticsIcon />, href: '/dashboard/admin/analytics' },
                        { text: 'Orders', icon: <ShoppingCartIcon />, href: '/dashboard/admin/orders' },
                        { text: 'Settings', icon: <SettingsIcon />, href: '/dashboard/admin/settings' },
                        { text: 'Home', icon: <HomeIcon />, href: '/' }
                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                                    <ListItemButton
                                component={Link}
                                href={item.href}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: (open || isMobile) ? 'initial' : 'center',
                                            px: 2.5,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        color: 'white',
                                        '& .MuiListItemIcon-root': {
                                            color: 'white',
                                        }
                                    }
                                }}
                            >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: (open || isMobile) ? 3 : 'auto',
                                                    justifyContent: 'center',
                                        color: 'text.secondary'
                                    }}
                                >
                                    {item.icon}
                                            </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    sx={{ 
                                        opacity: (open || isMobile) ? 1 : 0,
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }
                                    }} 
                                />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                <List sx={{ px: 1 }}>
                    {[
                        { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard/user' },
                        { text: 'My Orders', icon: <ShoppingCartIcon />, href: '/dashboard/user/my-orders' },
                        { text: 'Profile', icon: <PeopleIcon />, href: '/profile' },
                        { text: 'Settings', icon: <SettingsIcon />, href: '/dashboard/user/settings' },
                        { text: 'Home', icon: <HomeIcon />, href: '/' }
                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                                    <ListItemButton
                                component={Link}
                                href={item.href}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: (open || isMobile) ? 'initial' : 'center',
                                            px: 2.5,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        color: 'white',
                                        '& .MuiListItemIcon-root': {
                                            color: 'white',
                                        }
                                    }
                                }}
                            >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: (open || isMobile) ? 3 : 'auto',
                                                    justifyContent: 'center',
                                        color: 'text.secondary'
                                    }}
                                >
                                    {item.icon}
                                            </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    sx={{ 
                                        opacity: (open || isMobile) ? 1 : 0,
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }
                                    }} 
                                />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
            )}
        </Box>
    );

    return (
        <DrawerContext.Provider value={{ open, setOpen }}>
            <CssBaseline />
            
            {/* Mobile AppBar */}
            <AppBar 
                position="fixed" 
                sx={{ 
                    display: { xs: 'block', sm: 'none' },
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundColor: 'primary.main'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <MuiDrawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: drawerWidth,
                        backgroundColor: 'background.paper'
                    },
                }}
            >
                {drawerContent}
            </MuiDrawer>

            {/* Desktop Drawer */}
            <Drawer 
                variant="permanent" 
                open={open}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
                        height: '100vh',
                        backgroundColor: 'background.paper',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        position: 'relative',
                        zIndex: theme.zIndex.drawer
                    },
                }}
            >
                {drawerContent}
            </Drawer>

        </DrawerContext.Provider>
    );
}