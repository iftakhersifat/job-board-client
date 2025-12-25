import React, { use, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { 
  LayoutDashboard, PlusCircle, Briefcase, Settings, 
  LogOut, ChevronDown, User, Menu, X, Home, Info, PhoneCall,
  ShieldCheck, BriefcaseBusiness
} from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. Handle background scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup if component unmounts
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // 2. Handle sticky scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Logged out safely');
        setIsOpen(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const navLinkStyles = ({ isActive }) => `
    relative flex items-center gap-2 px-4 py-2.5 text-[14px] font-bold transition-all duration-300 rounded-xl group
    ${isActive 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
      : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}
  `;

  const NavLinks = () => (
    <>
      <NavLink to="/" className={navLinkStyles}><Home size={18} /> Home</NavLink>
      {user && (
        <NavLink to="/myApplications" className={navLinkStyles}>
          <BriefcaseBusiness size={18} /> My Jobs
        </NavLink>
      )}
      {user?.role === "admin" && (
        <>
          <NavLink to="/admin" className={navLinkStyles}><ShieldCheck size={18}/> Admin</NavLink>
          <NavLink to="/pending-jobs" className={navLinkStyles}>Audit Queue</NavLink>
        </>
      )}
      {(user?.role === "admin" || user?.role === "employee") && (
        <>
          <NavLink to="/addJob" className={navLinkStyles}><PlusCircle size={18}/> Post Job</NavLink>
          <NavLink to="/myPostedJobs" className={navLinkStyles}>Manage Jobs</NavLink>
        </>
      )}
    </>
  );

//   const Logo = () => (
//   <div className="flex items-center gap-4 select-none group cursor-pointer relative py-1">
//     {/* THE ICON: Multi-Layered Kinetic Squircle */}
//     <div className="relative flex items-center justify-center">
      
//       {/* Dynamic Indigo Depth Aura */}
//       <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 group-hover:scale-150 transition-all duration-700"></div>
      
//       {/* Main Chassis */}
//       <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[15px] flex items-center justify-center overflow-hidden border border-white/10 shadow-xl shadow-indigo-900/20 transition-all duration-500 group-hover:shadow-indigo-500/40 group-hover:-translate-y-1">
        
//         {/* Animated Precision Scanning Beam (Perfect for a Job Search feel) */}
//         <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-white/30 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[1.5s] ease-in-out"></div>

//         {/* The Letter J: Forward-Leaning Italic */}
//         <span className="relative z-10 text-white font-[1000] text-2xl italic tracking-tighter drop-shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
//           J
//         </span>

//         {/* Internal Architectural Grid (Subtle Detail) */}
//         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:4px_4px]"></div>
//       </div>
//     </div>

//     {/* THE TEXT: Split-Weight Prestige Branding */}
//     <div className="flex flex-col -space-y-1.5">
//       <div className="flex items-center">
//         {/* JOB: Solid Foundation */}
//         <span className="text-2xl font-[1000] text-slate-800 dark:text-white tracking-tighter uppercase transition-colors duration-300 group-hover:text-indigo-600">
//           JOB
//         </span>
//         {/* BOX: Precision Cut */}
//         <span className="text-2xl font-extralight text-indigo-500 tracking-tighter uppercase transition-all duration-500 group-hover:text-indigo-400">
//           BOX
//         </span>
        
//         {/* The "Placement" Dot - Signifies landing a job */}
//         <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full ml-1.5 shadow-[0_0_12px_rgba(79,70,229,0.6)] group-hover:scale-150 group-hover:bg-indigo-400 transition-all duration-300"></span>
//       </div>
      
//       {/* Unique Tagline: Architectural & Future-Focused */}
//       <div className="flex items-center gap-2">
//         <div className="h-[1px] w-4 bg-slate-300 dark:bg-slate-700 group-hover:w-8 group-hover:bg-indigo-500 transition-all duration-700"></div>
//         <h1 className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.45em] transition-colors group-hover:text-indigo-600">
//           Future Pathway
//         </h1>
//       </div>
//     </div>
//   </div>
// );

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-2' : 'bg-white py-4'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* LOGO AREA */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="transition-transform active:scale-95">
              <img src="/assets/logo.png" className="w-32 md:w-40" alt="JobPortal Logo" />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
             <NavLinks />
          </div>

          {/* DESKTOP PROFILE / AUTH */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="flex items-center gap-3 pl-3 pr-1 py-1 bg-white border border-slate-200 rounded-full hover:shadow-md transition-all cursor-pointer">
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-slate-800 leading-none">{user?.displayName?.split(' ')[0] || "User"}</p>
                    <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-tighter">{user?.role}</p>
                  </div>
                  <img className="w-9 h-9 rounded-full object-cover border border-slate-100" src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&bg=6366f1&color=fff`} alt="Avatar" />
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-2xl w-56 border border-slate-100 mt-4 animate-in fade-in slide-in-from-top-2">
                   <li><Link to="/dashboard" className="py-3 font-medium"><LayoutDashboard size={18}/> Dashboard</Link></li>
                   <li><Link to="/about" className="py-3 font-medium"><User size={18}/> Profile Settings</Link></li>
                   <div className="divider my-0 opacity-50"></div>
                   <li>
                    <button onClick={handleLogOut} className="text-red-600 hover:bg-red-50 font-bold py-3 mt-1">
                      <LogOut size={18} /> Sign Out
                    </button>
                   </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition">Log In</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5">
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(true)} className="p-2 rounded-xl bg-slate-50 text-slate-600 active:scale-90 transition-all">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[100] transition-visibility duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        <div 
            className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setIsOpen(false)}
        />
        {/* Added overflow-y-auto to this div so only the drawer scrolls if content is long */}
        <div className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out transform overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col min-h-full">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50/50 sticky top-0 bg-white z-10">
              <img src="/assets/logo.png" className="w-28" alt="Logo" />
              <button onClick={() => setIsOpen(false)} className="p-2 bg-white shadow-sm border rounded-lg text-slate-400">
                <X size={18} />
              </button>
            </div>

            {user && (
              <div className="mx-5 mt-6 p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
                <div className="flex items-center gap-3">
                    <img className="w-12 h-12 rounded-full border-2 border-white/20" src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}`} alt="" />
                    <div className="overflow-hidden">
                        <p className="font-bold truncate text-sm">{user?.displayName || "User"}</p>
                        <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">{user?.role}</p>
                    </div>
                </div>
              </div>
            )}

            <div className="flex-grow py-6 px-3 space-y-1" onClick={() => setIsOpen(false)}>
               <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Navigation</p>
               <NavLinks />
               <div className="divider px-4 opacity-50"></div>
               <Link to="/about" className="flex items-center gap-3 px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition"><Info size={18}/> About Us</Link>
               <Link to="/contact" className="flex items-center gap-3 px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition"><PhoneCall size={18}/> Help Center</Link>
            </div>

            <div className="p-5 border-t bg-slate-50/50 mt-auto sticky bottom-0 bg-white z-10">
              {user ? (
                <button 
                  onClick={handleLogOut} 
                  className="w-full flex items-center justify-center gap-2 bg-white border border-red-100 text-red-600 p-3.5 rounded-xl font-bold shadow-sm active:scale-95 transition-all"
                >
                  <LogOut size={18} /> Sign Out Account
                </button>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center bg-indigo-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-indigo-200"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;