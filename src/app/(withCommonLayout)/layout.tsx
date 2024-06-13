import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import { Toaster, toast } from 'sonner'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
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