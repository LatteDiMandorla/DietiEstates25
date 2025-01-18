import { SkeletonTheme } from "react-loading-skeleton";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="h-dvh overflow-hidden flex flex-col">
      <SkeletonTheme>
        <Outlet />
      </SkeletonTheme>
    </div>
  )
}

export default App
