import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Components/Root/Root.jsx';
import Home from './Components/Pages/Home.jsx';
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/Register.jsx';
import AuthProvider from './Components/Firebase/AuthProvider.jsx';
import ProfileUpdate from './Components/Pages/ProfileUpdate.jsx';
import MoreDetails from './Components/Jobs/MoreDetails.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {index: true, Component:Home},
      {path: '/login', Component:Login},
      {path: '/register', Component:Register},
      {path: '/jobs/:id', Component:MoreDetails,
        loader: ({params})=> fetch(`http://localhost:3000/jobs/${params.id}`)
      },
      // {path: '/profile', Component:ProfileUpdate},
      
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>

  </StrictMode>,
)
