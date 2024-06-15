import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import { Roboto } from 'next/font/google'
import { Toaster, toast } from 'sonner'
import NextTopLoader from 'nextjs-toploader';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
  })
   

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={roboto.className + `bg-gray-100`}>
            <Navbar />
            <div className="bg-red-500 text-black p-4 flex justify-center font-bold">
                 <h1>New notice will come here soon!</h1>
            </div>
            <Toaster />
            <div>
                <NextTopLoader />
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default CommonLayout;