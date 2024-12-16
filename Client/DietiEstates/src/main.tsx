import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import Layout from './pages/Layout.tsx'
import { FirstStep } from './pages/FirstStep.tsx'
import ImmobilePage from './pages/ImmobilePage.tsx';
import { MapPage } from './pages/MapPage.tsx';

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
            path: "/immobile",
            element: <ImmobilePage />
          },
          {
            path: "/FirstStep",
            element: <FirstStep />
          },
          {
            path: "/map",
            element: <MapPage />
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

    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
