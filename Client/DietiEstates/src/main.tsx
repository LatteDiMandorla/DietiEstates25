import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import Layout from './pages/Layout.tsx'
import ImmobilePage from './pages/ImmobilePage.tsx'

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
            element: <HomePage />
          },
          {
            path: "/immobile",
            element: <ImmobilePage />
          }
        ]
      },
      {
        path: "/login",
        element: <LoginPage />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
