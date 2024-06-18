import { DDrawer } from "@/Components/UI/DDrawer/DDrawer";
import { Toaster } from "sonner";
import NextTopLoader from 'nextjs-toploader';
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <Toaster/>
            <div className="grid grid-cols-1 ms-20">
                <DDrawer />
                <div className="me-[100px] ">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default CommonLayout;