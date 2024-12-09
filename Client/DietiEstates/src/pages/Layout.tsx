import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";

function Layout() {
    return (
        <>
            <Topbar title="topbar" />
            <Outlet />
        </>
    )
}

export default Layout;