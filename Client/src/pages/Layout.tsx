import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import { BottomBar } from "../components/BottomBar";

function Layout() {
    return (
        <div className="flex flex-col w-full h-full">
            <Topbar />
            <Outlet />
            <div className="lg:hidden hidden">
                <BottomBar />
            </div>
        </div>
    )
}

export default Layout;