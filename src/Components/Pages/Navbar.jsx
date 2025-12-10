import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
  // for user check
 const {user, logOut}=use(AuthContext);

//  logout handel
const handleLogOut =() =>{
  logOut()
  .then(()=>toast.success('Logout successfully!'))
  .catch((error)=>toast.error(error.message || "Log out failed"))
}

  const links = <>
  <li><NavLink to="/" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Home</NavLink></li>
  {user && <>
    <li><NavLink to="/myApplications" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>MyApplications</NavLink></li>
    </>}

  {user?.role === "employee" && (<>
  <li><NavLink to="/dashboard" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Dashboard</NavLink></li>
  </>)}
  {user?.role === "user" && (<>
  <li><NavLink to="/dashboard" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Dashboard</NavLink></li>
  </>)}

  {user?.role === "admin" && (<>
  <li><NavLink to="/admin" className={({isActive})=> isActive ? 'text-violet-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Admin Panel</NavLink></li>

  <li><NavLink to="/pending-jobs" className={({isActive})=> isActive ? 'text-violet-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Pending Jobs</NavLink></li>

  <li><NavLink to="/addJob" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Add Job</NavLink></li>

  <li><NavLink to="/myPostedJobs" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Posted Job</NavLink></li>
  </>)}

  {user?.role === "employee" && (<>
  <li><NavLink to="/addJob" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Add Job</NavLink></li>

  <li><NavLink to="/myPostedJobs" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Posted Job</NavLink></li>
  </>)}

  </>

  const moreLinks = <>
  <li><NavLink to="/about" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>About</NavLink></li>
  <li><NavLink to="/contact" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Contact</NavLink></li>
  </>


    return (
        <div className="shadow-md sticky top-0 z-50 bg-white">
            <div className="navbar max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
        <li>
          <a className='font-medium'>More</a>
          <ul className="p-2">
            {moreLinks}
          </ul>
        </li>

      </ul>
    </div>
    {/* logo */}
    <Link to="/"><div className='ml-5 md:ml-5 lg:ml-4'>
      <img src="/assets/logo.png" className='w-[200px] -ml-8' alt="" />
    </div></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
      <li>
        <details>
          <summary className='font-medium'>More</summary>
          <ul className="p-2">
            {moreLinks}
          </ul>
        </details>
      </li>
      
    </ul>
  </div>
  <div className="navbar-end">
    {user? <>
    {/* <img src={user?.photoURL} alt={user?.displayName || 'User'} className="w-10 h-10 rounded-full mr-2 border-2 border-[#613FE5] object-cover" /> */}
    <button onClick={handleLogOut} className='btn bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-md hover:shadow-lg text-white px-4 py-1 rounded-xl font-medium hover:bg-red-600 transition'>Log Out</button></> : <>
    
    <NavLink className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl text-white px-4 py-1 rounded-lg font-medium hover:bg-blue-700" to="/login">Login</NavLink>
    
    </>}
  </div>
</div>
        </div>
    );
};

export default Navbar;