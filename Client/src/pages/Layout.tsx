import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";

function Layout() {
    return (
        <div className="flex flex-col w-full h-full">
            <Topbar />
            <Outlet />
        </div>
    )
}

export default Layout;