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
import MoreDetails from './Components/Jobs/MoreDetails.jsx';
import Private from './Components/Firebase/Private.jsx';
import ApplyJobs from './Components/Jobs/ApplyJobs.jsx';
import MyApplications from './Components/Jobs/MyApplications.jsx';
import JobAdd from './Components/AddJob/JobAdd.jsx';
import MyPostedJobs from './Components/AddJob/MyPostedJobs.jsx';
import ViewApplication from './Components/AddJob/ViewApplication.jsx';
import NotFound from './Components/Pages/NotFound.jsx';
import { Toaster } from 'react-hot-toast';


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
      {path: '/jobApply/:id', element:<Private><ApplyJobs></ApplyJobs></Private>},
      {path: '/myApplications', element:<Private><MyApplications></MyApplications></Private>},

      // add job
      {path: '/addJob', element:<Private><JobAdd></JobAdd></Private>},
      {path: '/myPostedJobs', element:<Private><MyPostedJobs></MyPostedJobs></Private>},
      {path: '/applications/:id', element:<Private><ViewApplication></ViewApplication></Private>,
        loader: ({params})=> fetch(`http://localhost:3000/applications/job/${params.id}`)
      },
      
    ]
  },
  {
    path: "*", Component: NotFound
  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />,
    </AuthProvider>

  </StrictMode>,
)
