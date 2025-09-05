import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${roboto.className} bg-gray-100`}>
            <Navbar />
            <Toaster />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default CommonLayout;
