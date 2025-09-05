"use client";
import { DDrawer, useDrawerContext } from "@/Components/UI/DDrawer/DDrawer";
import { Toaster } from "sonner";
import { Box, useTheme, useMediaQuery } from '@mui/material';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Toaster/>
            <DDrawer />
            <MainContent>{children}</MainContent>
        </Box>
    );
}

const MainContent = ({ children }: { children: React.ReactNode }) => {
    const { open } = useDrawerContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box 
            component="main" 
            sx={{ 
                flexGrow: 1, 
                p: { xs: 2, sm: 3 },
                marginTop: { xs: '64px', sm: 0 },
                transition: 'all 0.3s ease',
                minHeight: '100vh',
                width: { 
                    xs: '100%', 
                    sm: open ? 'calc(100% - 240px)' : 'calc(100% - 64px)' 
                }
            }}
        >
            {children}
        </Box>
    );
}

export default CommonLayout;