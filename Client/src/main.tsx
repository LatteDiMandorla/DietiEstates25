import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css';
import 'react-modern-drawer/dist/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-range-slider-input/dist/style.css';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import Layout from './pages/Layout.tsx'
import { FirstStep } from './pages/FirstStep.tsx'
import { SecondStep } from './pages/SecondStep.tsx'
import ImmobilePage from './pages/ImmobilePage.tsx';
import { MapPage } from './pages/MapPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx'
import { AuthProvider } from './contexts/AuthProvider.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AltLayout from './pages/AltLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [ 
          {
            path: "",
            element: <Navigate to="/home" replace />
          },
          {
            path: "/search",
            element: <SearchPage />
          },

          {
            path: "/map",
            element: <MapPage />
          },
          {
            path: "/immobile",
            element: <ImmobilePage />
          }
    
        ]
      },

      {
        path: "",
        element: <AltLayout/>,
        children: [
          {
            path: "/FirstStep",
            element: <FirstStep/>
          },

          {
            path: "/SecondStep",
            element: <SecondStep/>
          }
    
        ]
      },

      {
        
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/Home",
        element: <HomePage />
      },

      {
        path: "/ProfilePage", 
        element: <ProfilePage />
      }
    ]
  }

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
