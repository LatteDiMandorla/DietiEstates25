import { SkeletonTheme } from "react-loading-skeleton";
import { Outlet } from "react-router-dom";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';

function App() {
  const axios = useAxiosPrivate();
  const { auth, setAuth} = useAuth();

  useEffect(() => {
    const fetchSelf = async () => {
      try {
        const {data} = await axios.get("/auth/self");
        if(data){
          setAuth(prev => ({...data, accessToken: prev?.accessToken, ruolo: prev?.ruolo}));
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchSelf();
  }, [])

  useEffect(() => {
    console.log("App", auth);
  }, [auth])

  return (
    <div className="h-dvh overflow-hidden flex flex-col">
      <SkeletonTheme>
        <ToastContainer />
        <Outlet />
      </SkeletonTheme>
    </div>
  )
}

export default App
