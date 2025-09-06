"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'; // Changed from `jwtDecode` to `jwtDecode` to correctly import the default export
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // profile
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // account
import DashboardIcon from '@mui/icons-material/Dashboard'; // dashboard
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // cart
import LogoutIcon from '@mui/icons-material/Logout'; // logout
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { removeAccessTokenCookie } from "@/Components/RemoveCookieToken/RemoveCookieToken";
import Image from 'next/image';

const pages = {
  'Products': 'flashsale',
  'About Us': 'aboutus',
  'Contact Us': 'contactus',
};
const entries = Object.entries(pages);

const USER = {
  'Profile': {
    label: 'profile',
    link: '/profile',
    icon: <PersonOutlineIcon />
  },
  'Account': {
    label: 'account',
    link: '/account',
    icon: <ManageAccountsIcon />
  },
  'Dashboard': {
    label: 'dashboard',
    link: '/dashboard/user',
    icon: <DashboardIcon />
  },
  'Cart': {
    label: 'cart',
    link: '/dashboard/user/my-orders',
    icon: <AddShoppingCartIcon />
  },
  'Logout': {
    label: 'logout',
    link: '/login',
    icon: <LogoutIcon />
  }
};

const ADMIN = {
  'Profile': {
    label: 'profile',
    link: '/profile',
    icon: <PersonOutlineIcon />
  },
  'Account': {
    label: 'account',
    link: '/account/admin',
    icon: <ManageAccountsIcon />
  },
  'Dashboard': {
    label: 'dashboard',
    link: '/dashboard/admin',
    icon: <DashboardIcon />
  },
  'Logout': {
    label: 'logout',
    link: '/login',
    icon: <LogoutIcon />
  }
};

const user_entries = Object.entries(USER);
const admin_entries = Object.entries(ADMIN);

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Mark as hydrated after first render
    setIsHydrated(true);
    setIsClient(true);
    
    const checkAuth = () => {
    const storedToken = localStorage.getItem('Token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken: {
          email: string;
          role: string;
        } = jwtDecode(storedToken);
        setUserEmail(decodedToken.email);
        setIsAdmin(decodedToken.role);
      } catch (error) {
        console.error('Invalid token', error);
      }
      } else {
        setToken(null);
        setUserEmail(null);
        setIsAdmin(null);
      }
    };

    // Check auth on mount
    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    // Listen for custom auth events
    window.addEventListener('authChange', handleAuthChange);
    
    // Listen for storage changes (when token is updated in another tab)
    window.addEventListener('storage', (e) => {
      if (e.key === 'Token') {
        checkAuth();
      }
    });

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    setToken(null);
    setUserEmail(null);
    setIsAdmin(null);
    removeAccessTokenCookie();
    // Dispatch custom event to notify other components of logout
    window.dispatchEvent(new CustomEvent('authChange'));
    router.push('/login');
  };


  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname.startsWith(href);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700}}>TRX</Typography>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 280 }} role="presentation">
                {/* Close Button Header */}
                <Box sx={{ 
                  p: 2, 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Menu
                  </Typography>
                  <IconButton 
                    onClick={toggleDrawer(false)}
                    sx={{ 
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/" selected={pathname === "/"}>
                      <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
              {entries.map(([key, value]) => (
                    <ListItem key={key} disablePadding>
                      <ListItemButton component={Link} href={`/${value}`} selected={isActive(`/${value}`)}>
                        <ListItemIcon>
                          {key === 'Products' && <BoltOutlinedIcon />}
                          {key === 'About Us' && <InfoOutlinedIcon />}
                          {key === 'Contact Us' && <ContactSupportOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={key} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {/* Cart Icon in mobile menu */}
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/cart">
                      <ListItemIcon>
                        <AddShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Shopping Cart" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            <Typography
              fontSize="27px"
              fontWeight={550}
              sx={{ color: 'primary.main' }}
            >
              TechRubix
            </Typography>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            {entries.map(([key, value]) => (
                <Button
                  key={key}
                component={Link}
                href={`/${value}`}
                variant={isActive(`/${value}`) ? 'outlined' : 'text'}
                color={isActive(`/${value}`) ? 'primary' : 'inherit'}
                sx={{
                  my: 1,
                  px: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
                >
                  {key}
                </Button>
            ))}
            {/* Cart Icon positioned after Contact Us */}
            <IconButton component={Link} href="/cart" color="primary" sx={{ ml: 2 }}>
              <Badge badgeContent={0} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          {isHydrated && isClient && userEmail && (
            <Typography variant="body2" sx={{ mr: 1, display: { xs: 'none', md: 'block' }}}>{userEmail}</Typography>
          )}
          {!isHydrated ? (
            <Box sx={{ width: 40, height: 40 }} /> // Placeholder to prevent layout shift
          ) : token !== null ? ( // Conditionally render based on the token state
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={`${userEmail?.[0]}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isAdmin === 'admin'
                  ? admin_entries.map(([key, { label, icon, link }]) => (
                    <MenuItem key={key} onClick={handleCloseUserMenu}>
                      <Link href={link}>
                        <Typography
                          sx={{
                            paddingLeft: '30px',
                            paddingRight: '30px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            ':hover': {
                              backgroundColor: 'black',
                              color: 'white',
                            },
                            width: '200px',
                          }}
                        >
                          {
                            key === 'Logout' ? <h1 onClick={handleLogout}>
                              {icon}
                              <span style={{ marginLeft: '10px' }}>{label}</span>
                            </h1> : <h1>
                              {icon}
                              <span style={{ marginLeft: '10px' }}>{label}</span>
                            </h1>
                          }
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))
                  : user_entries.map(([key, { label, icon, link }]) => (
                    <MenuItem key={key} onClick={handleCloseUserMenu}>
                      <Link href={link}>
                        <Typography
                          sx={{
                            paddingLeft: '30px',
                            paddingRight: '30px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            ':hover': {
                              backgroundColor: 'black',
                              color: 'white',
                            },
                            width: '200px',
                          }}
                        >
                          {
                            key === 'Logout' ? <h1 onClick={handleLogout}>
                              {icon}
                              <span style={{ marginLeft: '10px' }}>{label}</span>
                            </h1> : <h1>
                              {icon}
                              <span style={{ marginLeft: '10px' }}>{label}</span>
                            </h1>
                          }
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          ) : (
            <Link href="/login">
              <Button variant="contained" disableElevation sx={{ my: 1 }}>Login</Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
