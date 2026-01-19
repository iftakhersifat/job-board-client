import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router';
import { 
  FaChevronLeft, FaChevronRight, FaSignOutAlt, FaBell
} from 'react-icons/fa';
import { 
  PlusCircle, User, BriefcaseBusiness, ListChecks, Loader2
} from 'lucide-react';
import { AuthContext } from '../Firebase/AuthProvider';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import toast from 'react-hot-toast';

const PDashboard = () => {
    const { user, logOut, loading } = useContext(AuthContext); 
    const [isExpanded, setIsExpanded] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user?.uid) return;
        const q = query(
            collection(db, "notifications", user.uid, "userNotifications"),
            orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNotifications(notes);
        });
        return () => unsubscribe();
    }, [user?.uid]);

    useEffect(() => {
        if (location.pathname === "/dash-board" || location.pathname === "/dash-board/") {
            navigate("/dash-board/profile");
        }
    }, [location.pathname, navigate]);

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Signed out successfully");
            navigate('/login');
        } catch (error) { 
            toast.error("Logout failed"); 
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                <div className="relative flex items-center justify-center">
                    <div className="h-20 w-20 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
                    <Loader2 className="absolute text-indigo-600 animate-pulse" size={32} />
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Initializing Dashboard</p>
            </div>
        );
    }

    const Logo = () => (
        <Link to="/" className="flex items-center gap-3 outline-none group">
          <div className="relative w-10 h-10 bg-slate-900 rounded-[12px] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-indigo-600 group-hover:rounded-[18px] group-hover:rotate-[10deg] shadow-lg">
            <span className="relative z-10 text-white font-[1000] text-xl italic tracking-tighter">J</span>
          </div>
          {isExpanded && (
            <div className="flex flex-col -space-y-1 animate-in fade-in duration-500">
                <div className="flex items-center">
                    <span className="text-xl font-[1000] tracking-tighter text-slate-900 group-hover:text-indigo-600">JOB</span>
                    <span className="text-xl font-light tracking-tighter text-indigo-600 ml-0.5">BOX</span>
                </div>
                <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-400">Future Pathway</span>
            </div>
          )}
        </Link>
    );

    const navLinkStyles = ({ isActive }) => 
        `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-[13px] ${
            isActive ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200/50" : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"}`;

    return (
        <div className="flex min-h-screen bg-[#FDFDFF]">
            <aside className={`fixed md:sticky top-0 h-screen bg-white border-r border-slate-100 transition-all duration-500 z-50 flex flex-col ${isExpanded ? "w-72" : "w-24"}`}>
                
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="hidden md:flex absolute -right-3 top-10 bg-white border border-slate-100 w-7 h-7 rounded-full items-center justify-center shadow-md z-50 hover:bg-indigo-600 hover:text-white transition-all"
                >
                    {isExpanded ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
                </button>

                <div className="p-6">
                    <div className={`mb-10 ${!isExpanded && "flex justify-center"}`}><Logo /></div>
                </div>

                <nav className="flex-1 px-6 space-y-2 overflow-y-auto no-scrollbar">
                    <NavLink to="/dash-board/profile" className={navLinkStyles}>
                        <User size={18} /> {isExpanded && <span>My Profile</span>}
                    </NavLink>
                    
                    <NavLink to="/dash-board/notifications" className={navLinkStyles}>
                        <div className="relative">
                            <FaBell size={18} />
                            {notifications.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>}
                        </div>
                        {isExpanded && <span>Notifications</span>}
                    </NavLink>
                    
                    <NavLink to="/dash-board/my-applications" className={navLinkStyles}>
                        <BriefcaseBusiness size={18} /> {isExpanded && <span>My Applications</span>}
                    </NavLink>

                    {(user?.role === "admin" || user?.role === "employee") && (
                        <>
                            <p className={`text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-4 mt-8 mb-4 ${!isExpanded && "hidden"}`}>Recruiter Panel</p>
                            <NavLink to="/dash-board/add-job" className={navLinkStyles}>
                                <PlusCircle size={18} /> {isExpanded && <span>Post a New Job</span>}
                            </NavLink>
                            <NavLink to="/dash-board/manage-jobs" className={navLinkStyles}>
                                <ListChecks size={18} /> {isExpanded && <span>Manage All Jobs</span>}
                            </NavLink>
                        </>
                    )}
                    {(user?.role === "admin") && (
                        <>
                            <p className={`text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-4 mt-8 mb-4 ${!isExpanded && "hidden"}`}>Recruiter Panel</p>
                            <NavLink to="/dash-board/admin" className={navLinkStyles}>
                                <PlusCircle size={18} /> {isExpanded && <span>User List</span>}
                            </NavLink>
                            <NavLink to="/dash-board/pending-jobs" className={navLinkStyles}>
                                <ListChecks size={18} /> {isExpanded && <span>Pending Jobs</span>}
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="p-6 border-t border-slate-50">
                    <button 
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-black text-[11px] uppercase tracking-widest text-rose-500 hover:bg-rose-50 group ${!isExpanded && "justify-center"}`}
                    >
                        <FaSignOutAlt size={18} className="group-hover:-translate-x-1 transition-transform" />
                        {isExpanded && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-[#FDFDFF]">
                <div className="p-4 md:p-10">
                    <Outlet context={{ notifications, user }} />
                </div>
            </main>
        </div>
    );
};

export default PDashboard;