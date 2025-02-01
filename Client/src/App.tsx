import { SkeletonTheme } from "react-loading-skeleton";
import { Outlet } from "react-router-dom";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

function App() {
  const axios = useAxiosPrivate();
  const { setAuth} = useAuth();

  useEffect(() => {
    const fetchSelf = async () => {
      try {
        const {data} = await axios.get("/auth/self");
        if(data){
          setAuth(prev => ({...data, accessToken: prev?.accessToken}));
        }
      } catch (error) {
        setAuth(undefined);
      }
    }

    fetchSelf();
  }, [])

  return (
    <div className="h-dvh overflow-hidden flex flex-col">
      <SkeletonTheme>
        <Outlet />
      </SkeletonTheme>
    </div>
  )
}

export default App
