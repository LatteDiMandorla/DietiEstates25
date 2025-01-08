import { SkeletonTheme } from "react-loading-skeleton";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="h-screen overflow-hidden">
      <SkeletonTheme>
        <Outlet />
      </SkeletonTheme>
    </div>
  )
}

export default App
