"use client"
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
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
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

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

interface TEmailData {
    data: {
        _id: string
        first_name: string
        last_name: string
        email: string
        password: string
        role?: string
    }
}


export const DDrawer = () => {
    const theme = useTheme();
    const [userEmail, setUserEmail] = React.useState<string | null>(null);
    const [userRole, setUserRole] = React.useState<string | null>(null);
    const { data: isAdminCheckByEmail } = useAdminCheckQuery(userEmail) as TEmailData;
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        const storedToken = localStorage.getItem('Token');
        if (storedToken) {
            try {
                const decodedToken: {
                    email: string;
                    role: string;
                } = jwtDecode(storedToken);
                setUserEmail(decodedToken.email);
                setUserRole(decodedToken.role)
                console.log(decodedToken);
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);


    return (
        <Box sx={{ display: 'flex', justifyContent: 'between' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ backgroundColor: 'red', display: 'flex' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),

                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className='block'>
                        <h1 className=''>{userEmail}</h1>
                        <h1 className='btn btn-xs'>{userRole === 'admin' ? 'Admin' : 'User'}</h1>
                    </div>

                </Toolbar>

            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {
                    isAdminCheckByEmail?.role ?
                        <List>
                            {['Add Products', 'All Product', 'All User', 'Home'].map((text, index) => (
                                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        {
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {
                                                    index === 0 && <Link href={'/dashboard/admin/products/add-products'}><AddIcon /></Link>
                                                }
                                                {
                                                    index === 1 && <Link href={'/dashboard/admin/products'}><CategoryIcon /></Link>
                                                }
                                                {
                                                    index === 2 && <Link href={'/dashboard/admin/all-users'}><PeopleIcon /></Link>
                                                }
                                                {
                                                    index === 3 && <Link href={'/'}><HomeIcon /></Link>
                                                }
                                            </ListItemIcon>
                                        }
                                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        :
                        <List>
                            {['My Orders', 'Home'].map((text, index) => (
                                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        {
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {
                                                    index === 0 && <Link href={'/dashboard/user/my-orders'}><ListAltIcon /></Link>
                                                }
                                                {
                                                    index === 1 && <Link href={'/'}><HomeIcon /></Link>
                                                }
                                            </ListItemIcon>


                                        }
                                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                }
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

            </Box>
        </Box>
    );
}