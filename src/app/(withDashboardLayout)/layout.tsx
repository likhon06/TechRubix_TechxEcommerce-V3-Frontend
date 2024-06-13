import { DDrawer } from "@/Components/UI/DDrawer/DDrawer";
import { Toaster } from "sonner";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <Toaster/>
            <div className="grid grid-flow-col ">
                <DDrawer />
                <div className="me-[100px] lg:me-[700px] mt-12">
                    {children}
                </div>
            </div>

        </div>
    );
}

export default CommonLayout;