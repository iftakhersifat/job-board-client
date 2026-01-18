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
import CategoryJobs from './Components/AddJob/CategoryJobs.jsx';
import DivisionJobs from './Components/Divison/DivisionJobs.jsx';
import SearchJobsPage from './Components/Pages/SearchJobsPage.jsx';
import RolePrivate from './Components/Firebase/RolePrivate.jsx';
import AdminPanel from './Components/Pages/AdminPanel.jsx';
import AdminPrivate from './Components/Firebase/AdminPrivate.jsx';
import Dashboard from './Components/Pages/Dashboard.jsx';
import AdminPendingJobs from './Components/Pages/AdminPendingJobs.jsx';
import EditJob from './Components/AddJob/EditJob.jsx';
import JobsPage from './Components/Jobs/JobsPage.jsx';
import ContactSection from './Components/Pages/ContactSection.jsx';
// import AboutUs from './Components/Pages/AboutUs.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {index: true, Component:Home},
      {path: "/jobs", element: <JobsPage />,},
      {path: '/login', Component:Login},
      {path: '/register', Component:Register},
      {path: '/jobs/:id', Component:MoreDetails,
        loader: ({params})=> fetch(`https://job-board-server-five.vercel.app/jobs/${params.id}`)
      },
      {path: '/jobApply/:id', element:<Private><ApplyJobs></ApplyJobs></Private>},
      {path: '/myApplications', element:<Private><MyApplications></MyApplications></Private>},

      // add job
      {path: '/addJob', element:<RolePrivate allowedRoles={["admin", "employee"]}><JobAdd></JobAdd></RolePrivate>},
      {path: '/myPostedJobs', element:<Private><MyPostedJobs></MyPostedJobs></Private>},
      {path: '/applications/:id', element:<Private><ViewApplication></ViewApplication></Private>,
        loader: ({params})=> fetch(`https://job-board-server-five.vercel.app/applications/job/${params.id}`)
      },
      {
        path: '/category/:category', element: <CategoryJobs></CategoryJobs>
      },
      {
        path:"/division/:division", element:<DivisionJobs></DivisionJobs>
      },
      {
        path:"/search/:searchTerm", element:<SearchJobsPage></SearchJobsPage>
      },
      {path: "/admin", element: (<AdminPrivate><AdminPanel /></AdminPrivate>),},
      {path:"/dashboard", element:<Dashboard></Dashboard>},
      // {path:"/about", element:<AboutUs></AboutUs>},
      {path:"/pending-jobs", element: <AdminPrivate><AdminPendingJobs></AdminPendingJobs></AdminPrivate>},
      {path:"/jobs/edit/:id", element:<EditJob></EditJob>},
      {path:"/contact", Component:ContactSection}

      


      
      
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
