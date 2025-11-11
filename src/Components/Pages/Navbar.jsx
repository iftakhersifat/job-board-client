import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';

const Navbar = () => {
  // for user check
 const {user, logOut}=use(AuthContext);

//  logout handel
const handleLogOut =() =>{
  logOut()
  .then(()=>console.log("logout successfully"))
  .catch(()=>console.log("logout failed"))
}

  const links = <>
  <li><NavLink to="/" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Home</NavLink></li>
  <li><NavLink to="/profile">Profile</NavLink></li>
  {
    user && <>
    <li><NavLink to="/myApplications" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>MyApplications</NavLink></li>

    <li><NavLink to="/addJob" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Add Job</NavLink></li>
    </>
  }
  </>

  const moreLinks = <>
  <li><NavLink to="/about" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>About</NavLink></li>
  <li><NavLink to="/contact" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-violet-500 font-medium transition'}>Contact</NavLink></li>
  </>


    return (
        <div className="shadow-md sticky top-0 z-50">
            <div className="navbar max-w-6xl mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
        <li>
          <a>Parent</a>
          <ul className="p-2">
            {moreLinks}
          </ul>
        </li>

      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
      <li>
        <details>
          <summary>More</summary>
          <ul className="p-2">
            {moreLinks}
          </ul>
        </details>
      </li>
      
    </ul>
  </div>
  <div className="navbar-end">
    {user? <><img src={user.photoURL || '/assets/user.png'} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full mr-2 border-2 border-[#613FE5] object-cover" />
    <button onClick={handleLogOut} className='btn bg-red-500 text-white px-4 py-1 rounded-xl font-medium hover:bg-red-600 transition'>Log Out</button></> : <><NavLink className="bg-blue-600 text-white px-4 py-1 rounded-lg font-medium hover:bg-blue-700" to="/login">Login</NavLink></>}
  </div>
</div>
        </div>
    );
};

export default Navbar;