import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css';
import 'react-modern-drawer/dist/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-range-slider-input/dist/style.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx';
import HomePage from './pages/HomePage.tsx'
import Layout from './pages/Layout.tsx'
import { FirstStep } from './pages/FirstStep.tsx'
import { SecondStep } from './pages/SecondStep.tsx'
import ImmobilePage from './pages/ImmobilePage.tsx';
import { MapPage } from './pages/MapPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx'
import { AuthProvider } from './contexts/AuthProvider.tsx';
import AltLayout from './pages/AltLayout.tsx';
import { ChangePasswordPage } from './pages/ChangePasswordPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { SelfProfilePage } from './pages/SelfProfile.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.tsx';
import { VerifyPage } from './pages/VerifyPage.tsx';

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
            path: "/immobile/:id",
            element: <ImmobilePage />
          },
          {
             path: "/ProfilePage", 
             element: <ProfilePage />
          },
          {
            path: "/self",
            element: <ProtectedRoute element={<SelfProfilePage />} roleRequired={["CLIENTE", "AGENTE"]} />
          },
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
            element: <SecondStep />
          }
    
        ]
      },

      {
        
        path: "/login",
        element: <LoginPage />,
      },
      {
        
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/Home",
        element: <HomePage />
      },
      {
        path: "/resetPassword",
        element: <ChangePasswordPage />
      },
      {
        path: "/forgotPassword",
        element: <ForgotPasswordPage />
      },
      {
        path: "/admin",
        element: <ProtectedRoute element={<AdminPage />} roleRequired={["GESTORE", "SUPPORTO"]} />
      },
      {
        path: "/verify",
        element: <VerifyPage />
      },
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
