"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
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
import AdbIcon from '@mui/icons-material/Adb';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // profile
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // account
import DashboardIcon from '@mui/icons-material/Dashboard'; // dashboard
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // cart
import LogoutIcon from '@mui/icons-material/Logout'; // logout
const pages = {
  'Products': 'products',
  'Flashsale': 'flashsale',
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

console.log(user_entries);


const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
  const router = useRouter();

  useEffect(() => {
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
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    setToken(null);
    router.push('/login');
  };

  return (
    <AppBar position="static" variant="outlined" sx={{
      backgroundColor: "black"
    }}>
      <Container maxWidth="lg" >
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Typography
              fontSize="27px"
              fontWeight={550}
              sx={{
                color: '#ff9a00'
              }}
              color="warning"
            >TechRubix</Typography>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {entries.map(([key, value]) => (
                <Link href={`/${value}`} key={key}>
                  <MenuItem key={key}>
                    <Typography textAlign="center">{key}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Typography
              fontSize="27px"
              fontWeight={550}
              sx={{
                color: '#ff9a00'
              }}
              color="warning"
            >TechRubix</Typography>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {entries.map(([key, value]) => (
              <Link href={`/${value}`} key={key}><Button
                key={key}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {key}
              </Button></Link>
            ))}
          </Box>
          <h1>{userEmail}</h1> &nbsp;&nbsp;
          {
            token !== null ?
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
                  {
                    isAdmin === 'admin' ?
                      admin_entries.map(([key, { label, icon, link }]) => (
                        <MenuItem key={key} onClick={handleCloseUserMenu}>
                          <Link href={link}>
                            <Typography sx={{
                              paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px',
                              ":hover": {
                                backgroundColor: 'black',
                                color: 'white'

                              },
                              width: '200px'
                            }}>
                             <h1 onClick={key === 'Logout' ? handleLogout : undefined}>
                                        {icon}
                                        <span style={{ marginLeft: '10px' }}>{label}</span>
                                    </h1>
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))
                      :
                      user_entries.map(([key, { label, icon, link }]) => (
                        <MenuItem key={key} onClick={handleCloseUserMenu}>
                          <Link href={link}>
                            <Typography  sx={{
                              paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px',
                              ":hover": {
                                backgroundColor: 'black',
                                color: 'white'

                              },
                              width: '200px'
                            }}>
                             <h1 onClick={key === 'Logout' ? handleLogout : undefined}>
                                        {icon}
                                        <span style={{ marginLeft: '10px' }}>{label}</span>
                                    </h1>
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))


                  }
                </Menu>
              </Box>
              :
              <Link href={`/login`}><Button variant="contained" sx={{
                paddingLeft: '30px', paddingRight: '30px',
                paddingTop: '10px', paddingBottom: '10px'
              }} color="warning">Login</Button></Link>
          }
        </Toolbar>
      </Container>

    </AppBar>
  );
}
export default Navbar;
