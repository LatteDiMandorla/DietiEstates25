import { Outlet } from "react-router-dom";
import { TopBarForSteps } from "../components/TopBarForSteps";

function AltLayout() {
    return (
        <div className="flex flex-col w-full h-full">
            <TopBarForSteps />
            <Outlet />
        </div>
    )
}

export default AltLayout;