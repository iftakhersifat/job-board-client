import React, { use, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { 
  LayoutDashboard, PlusCircle, Briefcase, Settings, 
  LogOut, ChevronDown, User, Menu, X, Home, Info, PhoneCall,
  ShieldCheck, BriefcaseBusiness,
  Bell
} from 'lucide-react';
import { FaBriefcase, FaLayerGroup } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Logged out safely');
        setIsOpen(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const navLinkStyles = ({ isActive }) => `
    relative flex items-center gap-2 px-5 py-2 text-[13px] font-bold transition-all duration-300 rounded-xl group
    ${isActive 
      ? 'text-indigo-600 bg-indigo-50/80 shadow-sm' 
      : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}
  `;

  const NavLinks = () => (
    <>
      <NavLink to="/" className={navLinkStyles} onClick={() => setIsOpen(false)}>
        <Home size={16} /> Home
      </NavLink>
      <NavLink to="/jobs" className={navLinkStyles} onClick={() => setIsOpen(false)}>
        <Briefcase size={16} /> All Jobs
      </NavLink>
      {user && (<>
        <NavLink to="/myApplications" className={navLinkStyles} onClick={() => setIsOpen(false)}>
          <BriefcaseBusiness size={16} /> My Applications
        </NavLink>

        <Link to="/profile" className="py-4 px-5 lg:hidden text-[13px] flex gap-2 font-bold text-slate-600 rounded-xl hover:text-indigo-600"><User size={18} /> Profile</Link>

        <Link to="/notification" className="py-4 px-5 lg:hidden text-[13px] flex gap-2 font-bold text-slate-600 rounded-xl hover:text-indigo-600"><Bell size={18} /> Notification</Link>
        </>
      )}
      {user?.role === "admin" && (
        <>
          <NavLink to="/admin" className={navLinkStyles} onClick={() => setIsOpen(false)}><ShieldCheck size={16}/> Admin</NavLink>
          <NavLink to="/pending-jobs" className={navLinkStyles} onClick={() => setIsOpen(false)}>Pending Jobs</NavLink>
          <NavLink to="/jobs-view" className={navLinkStyles} onClick={() => setIsOpen(false)}><FaLayerGroup size={16}/>Jobs View</NavLink>
        </>
      )}
      {(user?.role === "admin" || user?.role === "employee") && (
        <>
          <NavLink to="/addJob" className={navLinkStyles} onClick={() => setIsOpen(false)}><PlusCircle size={16}/> Post Job</NavLink>
          <NavLink to="/myPostedJobs" className={navLinkStyles} onClick={() => setIsOpen(false)}>Manage Jobs</NavLink>
        </>
      )}
    </>
  );

  const Logo = () => (
    <Link to="/" className="flex items-center gap-3 outline-none group" onClick={() => setIsOpen(false)}>
      <div className="relative w-10 h-10 md:w-11 md:h-11 bg-slate-900 rounded-[12px] md:rounded-[14px] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-indigo-600 group-hover:rounded-[18px] group-hover:rotate-[10deg] shadow-lg shadow-slate-200 group-hover:shadow-indigo-200">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]"></div>
        <span className="relative z-10 text-white font-[1000] text-xl md:text-2xl italic tracking-tighter transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[10deg]">J</span>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>
      <div className="flex flex-col -space-y-1">
        <div className="flex items-center">
          <span className="text-xl md:text-2xl font-[1000] tracking-tighter text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">JOB</span>
          <span className="text-xl md:text-2xl font-light tracking-tighter text-indigo-600 ml-0.5">BOX</span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full ml-1 animate-pulse"></span>
        </div>
        <span className="hidden md:block text-[8px] font-black uppercase tracking-[0.35em] text-slate-400 group-hover:text-slate-600">Future Pathway</span>
      </div>
    </Link>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full transition-all duration-300 z-[100] ${
        scrolled ? 'py-2 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'py-4 bg-white md:bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
          <div className="flex justify-between items-center h-12">
            
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>

            <div className="hidden lg:flex items-center bg-slate-100/50 border border-slate-200/30 p-1 rounded-2xl">
              <NavLinks />
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="flex items-center gap-3 p-1 pr-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 transition-all cursor-pointer">
                    <img className="w-9 h-9 rounded-xl object-cover" src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}`} alt="Avatar" />
                    <div className="text-left">
                      <p className="text-[12px] font-bold text-slate-800 leading-tight">{user?.displayName?.split(' ')[0] || "User"}</p>
                      <p className="text-[9px] font-black text-indigo-500 uppercase">{user?.role || "Member"}</p>
                    </div>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[110] menu p-2 shadow-2xl bg-white rounded-2xl w-60 border border-slate-100 mt-4 animate-in fade-in slide-in-from-top-3">

                      <li><Link to="/profile" className="py-3 px-4 font-bold text-slate-600 rounded-xl hover:text-indigo-600"><User size={18} className="text-indigo-500" /> Profile</Link></li>

                      <li><Link to="/notification" className="py-3 px-4 font-bold text-slate-600 rounded-xl hover:text-indigo-600"><Bell size={18} className="text-indigo-500" /> Notification</Link></li>

                      {user?.role === "admin" &&(
                        <>
                        <li><Link to="/jobs-view" className="py-3 px-4 font-bold text-slate-600 rounded-xl hover:text-indigo-600"><FaLayerGroup size={18} className="text-indigo-500" /> Jobs View</Link></li>
                        </>
                      )}

                      <div className="divider my-1 opacity-50 px-4"></div>
                      <li><button onClick={handleLogOut} className="text-rose-600 hover:bg-rose-50 font-black py-3 px-4 rounded-xl"><LogOut size={18} /> Sign Out</button></li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Log In</Link>
                  <Link to="/register" className="bg-slate-900 text-white px-7 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-600 transition-all">Join Now</Link>
                </div>
              )}
            </div>

            {/* Hamburg Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }} 
                className="relative z-[110] p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm active:scale-90 transition-all cursor-pointer"
                aria-label="Toggle Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[200] ${isOpen ? 'visible' : 'invisible'}`} style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsOpen(false)}
        />
        
        {/* Sidebar Drawer */}
        <div className={`absolute right-0 top-0 h-full w-[300px] bg-white transition-transform duration-500 ease-in-out transform shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full overflow-y-auto pointer-events-auto">
            
            <div className="p-6 flex justify-between items-center border-b border-slate-50 sticky top-0 bg-white z-10">
              <Logo />
              <button onClick={() => setIsOpen(false)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {user && (
              <div className="mx-6 mt-6 p-5 bg-linear-to-br from-slate-900 to-indigo-900 rounded-3xl text-white shadow-xl shadow-indigo-100">
                <div className="flex items-center gap-4">
                  <img className="w-14 h-14 rounded-2xl border-2 border-white/10" src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}`} alt="User" />
                  <div className="overflow-hidden">
                    <p className="font-bold truncate text-base leading-none">{user?.displayName || "User"}</p>
                    <p className="text-[10px] opacity-60 uppercase font-black tracking-[0.2em] mt-1.5">{user?.role}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-grow py-8 px-4 space-y-1.5">
               <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Navigation</p>
               
               <NavLinks />
            </div>

            <div className="p-6 border-t border-slate-50 sticky bottom-0 bg-white">
              {user ? (
                <button onClick={handleLogOut} className="w-full flex items-center justify-center gap-3 bg-rose-50 text-rose-600 p-4 rounded-2xl font-black active:scale-95 transition-all">
                  <LogOut size={18} /> Logout Account
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center bg-indigo-600 text-white p-4 rounded-2xl font-black shadow-lg shadow-indigo-100">
                  Get Started Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;