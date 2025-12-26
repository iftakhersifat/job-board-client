import React, { useContext, useState, useEffect, useRef } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { AuthContext } from "../Firebase/AuthProvider";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, Trash2, User, Mail, ShieldCheck, LogOut, 
  LayoutDashboard, CheckCircle, XCircle, 
  Calendar, Clock, Zap, Menu
} from "lucide-react";

const Dashboard = () => {
  const { user, UpdateUser, logOut } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentView, setCurrentView] = useState("profile");
  const prevRoleRef = useRef("");

  // ১. ইউজার ডাটা এবং রোল ফেচ করা
  useEffect(() => {
    if (!user) return;
    const fetchUserRole = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setRole(data.role || "user");
        prevRoleRef.current = data.role || "user";
      }
    };
    fetchUserRole();
    setName(user.displayName || user.name || "");
  }, [user]);

  // ২. রিয়েল-টাইম নোটিফিকেশন লিসেনার
  useEffect(() => {
    if (!user?.uid) return;
    const q = collection(db, "notifications", user.uid, "userNotifications");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setNotifications(list);
    });
    return () => unsubscribe();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await UpdateUser({ displayName: name });
      await updateDoc(doc(db, "users", user.uid), { name });
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Update failed");
    }
    setSaving(false);
  };

  const getNoteIcon = (type) => {
    const iconBase = "h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 ";
    switch (type) {
      case 'Hired': return <div className={iconBase + "bg-emerald-100 text-emerald-600"}><CheckCircle size={20}/></div>;
      case 'Rejected': return <div className={iconBase + "bg-rose-100 text-rose-600"}><XCircle size={20}/></div>;
      case 'Call For Interview': return <div className={iconBase + "bg-amber-100 text-amber-600"}><Calendar size={20}/></div>;
      case 'role_update': return <div className={iconBase + "bg-indigo-100 text-indigo-600"}><ShieldCheck size={20}/></div>;
      default: return <div className={iconBase + "bg-slate-100 text-slate-600"}><Bell size={20}/></div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* --- Desktop Sidebar --- */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <LayoutDashboard size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 uppercase">Dashboard</span>
          </div>

          <nav className="space-y-1.5">
            <SidebarLink icon={<LayoutDashboard size={20}/>} label="Overview" active={currentView === "profile"} onClick={() => setCurrentView("profile")} />
            <SidebarLink 
              icon={<Bell size={20}/>} 
              label="Notifications" 
              active={currentView === "notifications"} 
              onClick={() => setCurrentView("notifications")}
              count={notifications.length}
            />
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button onClick={logOut} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 min-w-0 overflow-hidden">
        
        {/* Dashboard Sub-Header (Sticky below Main Navbar) */}
        <header className="bg-white/80 backdrop-blur-md sticky top-[72px] lg:top-0 z-[40] border-b border-slate-200/60 px-4 md:px-12 py-4 flex justify-between items-center mt-[72px] lg:mt-18 transition-all">
          <div className="flex items-center gap-3">
            <div className="lg:hidden h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <Zap size={16} />
            </div>
            <h2 className="font-bold text-slate-500 text-sm md:text-base truncate max-w-[150px] md:max-w-none">
              Welcome, <span className="text-slate-900">{user?.displayName?.split(' ')[0] || 'User'}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
             {/* Mobile View Toggle Buttons */}
             <div className="lg:hidden flex bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setCurrentView("profile")} 
                  className={`p-2 rounded-lg transition-all ${currentView === "profile" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400"}`}
                >
                  <User size={18} />
                </button>
                <button 
                  onClick={() => setCurrentView("notifications")} 
                  className={`p-2 rounded-lg transition-all relative ${currentView === "notifications" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400"}`}
                >
                  <Bell size={18} />
                  {notifications.length > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full border border-white"></span>}
                </button>
             </div>

             <div className="hidden sm:flex h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 items-center justify-center text-indigo-600 font-black text-[10px]">
                {user?.displayName?.charAt(0) || 'U'}
             </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-4 md:p-12 max-w-5xl mx-auto pb-24">
          <AnimatePresence mode="wait">
            {currentView === "profile" ? (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, x:-10}} key="profile">
                <div className="mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">My Profile</h1>
                    <p className="text-slate-500 text-sm md:text-base font-medium">Settings and account verification.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                  <StatCard label="Account Status" value={role} icon={<ShieldCheck size={22}/>} theme="indigo" />
                  <StatCard label="Email Address" value={user?.email} icon={<Mail size={22}/>} theme="slate" />
                </div>

                <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 md:p-10">
                    <h3 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-800">
                      <User className="text-indigo-600" size={20} /> Personal Information
                    </h3>
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white p-4 rounded-2xl font-bold transition-all outline-none text-sm md:text-base" 
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={saving} 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all disabled:opacity-50"
                      >
                        {saving ? "Updating..." : "Update Profile"}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, x:10}} key="notifications" className="max-w-3xl mx-auto">
                <div className="mb-8 md:mb-10 flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Inbox</h1>
                    <p className="text-slate-500 text-sm md:text-base font-medium">Manage your alerts.</p>
                  </div>
                  <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                    {notifications.length} Total
                  </div>
                </div>

                <div className="space-y-3">
                  {notifications.length > 0 ? notifications.map((note) => (
                    <motion.div 
                      layout 
                      key={note.id} 
                      className="bg-white border border-slate-200/60 p-4 rounded-2xl md:rounded-[2rem] flex items-center gap-4 hover:border-indigo-200 transition-all group relative"
                    >
                      {getNoteIcon(note.type || note.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-xs md:text-sm mb-1 leading-tight">{note.message}</p>
                        <div className="flex items-center gap-2">
                           <Clock size={10} className="text-slate-300" />
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                               {note.createdAt?.toDate().toLocaleDateString()}
                           </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteDoc(doc(db, "notifications", user.uid, "userNotifications", note.id))} 
                        className="p-2 text-slate-300 hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  )) : (
                    <div className="bg-white border border-dashed border-slate-200 rounded-[2rem] py-20 text-center">
                      <Bell className="text-slate-100 mx-auto mb-3" size={48} />
                      <p className="text-slate-400 text-sm font-bold tracking-tight">Your inbox is empty</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---
const SidebarLink = ({ icon, label, active, onClick, count }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${
      active ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
    }`}
  >
    <div className="flex items-center gap-3">{icon} {label}</div>
    {count > 0 && (
      <span className={`h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-lg text-[10px] ${
        active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
      }`}>
        {count}
      </span>
    )}
  </button>
);

const StatCard = ({ label, value, icon, theme }) => (
  <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-[2rem] shadow-sm flex items-center gap-4 md:gap-5">
    <div className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
      theme === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'
    }`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{label}</p>
      <p className="text-base md:text-lg font-black text-slate-800 capitalize truncate">{value}</p>
    </div>
  </div>
);

export default Dashboard;