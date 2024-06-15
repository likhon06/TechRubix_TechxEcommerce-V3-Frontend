"use client"
import Link from "next/link"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

const pages = {
  'Products': 'products',
  'Flashsale': 'flashsale',
  'About Us': 'aboutus',
  'Contact Us': 'contactus',
};
const entries = Object.entries(pages);

const settings1 = {
  'Profile': 'profile',
  'Account': 'account',
  'Dashboard': 'dashboard',
  'Cart': 'dashboard',
  'Logout': 'login',
};
const entries_two = Object.entries(settings1);


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
  const router = useRouter();

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
                  {entries_two.map(([key, value]) => (
                    <Link key={key} href={key === 'Cart' ? `/${value}/user/my-orders` : `/${value}`}>
                      <MenuItem key={key} onClick={handleCloseUserMenu}>
                        {
                          <Typography textAlign="center">
                            {key === 'Logout' ? '' : key}
                          </Typography>
                        }
                        {

                          <Typography textAlign="center">
                            {key === 'Cart' ? <ShoppingCartIcon /> : ''}
                          </Typography>
                        }
                        {
                          key === 'Logout' &&
                          <Button onClick={handleLogout}>
                            <Typography textAlign="center">
                              {key}
                            </Typography>
                          </Button>
                        }
                      </MenuItem>
                    </Link>
                  ))}
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
