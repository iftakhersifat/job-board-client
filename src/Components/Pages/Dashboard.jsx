import React, { useContext, useState, useEffect } from "react";
import { doc, updateDoc, getDoc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../Firebase/AuthProvider";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, Trash2, User, Mail, ShieldCheck, LogOut, 
  LayoutDashboard, CheckCircle, XCircle, 
  Calendar, Clock, Camera, Loader2
} from "lucide-react";

const IMGBB_API_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY; 

const Dashboard = () => {
  const { user, UpdateUser, logOut } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentView, setCurrentView] = useState("profile");

  useEffect(() => {
    if (!user) return;
    const fetchUserRole = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setRole(data.role || "user");
      }
    };
    fetchUserRole();
    setName(user.displayName || user.name || "");
  }, [user]);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const imageUrl = data.data.display_url;
        await UpdateUser({ photoURL: imageUrl });
        await updateDoc(doc(db, "users", user.uid), { photo: imageUrl });
        toast.success("Profile picture updated!");
      }
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

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
      
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen z-20">
        <div className="p-8">
          <nav className="space-y-1.5 mt-4">
            <SidebarLink icon={<LayoutDashboard size={20}/>} label="Overview" active={currentView === "profile"} onClick={() => setCurrentView("profile")} />
            <SidebarLink icon={<Bell size={20}/>} label="Notifications" active={currentView === "notifications"} onClick={() => setCurrentView("notifications")} count={notifications.length} />
          </nav>
        </div>
        <div className="mt-auto p-6">
          <button onClick={logOut} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md sticky top-[72px] lg:top-0 z-[40] border-b border-slate-200/60 px-4 md:px-12 py-4 flex justify-end items-center mt-[72px] lg:mt-0 transition-all">
          <div className="flex items-center gap-2">
             <div className="lg:hidden flex bg-slate-100 p-1 rounded-xl">
                <button onClick={() => setCurrentView("profile")} className={`p-2 rounded-lg transition-all ${currentView === "profile" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400"}`}>
                  <User size={18} />
                </button>
                <button onClick={() => setCurrentView("notifications")} className={`p-2 rounded-lg transition-all relative ${currentView === "notifications" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400"}`}>
                  <Bell size={18} />
                  {notifications.length > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full border border-white"></span>}
                </button>
             </div>
             <div className="relative group">
               <img src={user?.photoURL || "https://i.ibb.co/3pL3NnH/user.png"} className="h-9 w-9 rounded-full object-cover border-2 border-indigo-100 shadow-sm" alt="profile" />
               {uploading && <div className="absolute inset-0 bg-white/60 rounded-full flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={14}/></div>}
             </div>
          </div>
        </header>

        <div className="p-4 md:p-12 max-w-5xl mx-auto pb-24">
          <AnimatePresence mode="wait">
            {currentView === "profile" ? (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, x:-10}} key="profile" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                <div className="md:col-span-4 space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl overflow-hidden ring-4 ring-slate-50 shadow-inner relative bg-slate-100">
                        {uploading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10"><Loader2 className="animate-spin text-indigo-600" /></div>
                        ) : (
                          <img src={user?.photoURL || "https://i.ibb.co/3pL3NnH/user.png"} className="h-full w-full object-cover" alt="Avatar" />
                        )}
                      </div>
                      <label className="absolute -bottom-2 -right-2 h-11 w-11 bg-indigo-600 text-white rounded-2xl border-4 border-white flex items-center justify-center cursor-pointer hover:bg-indigo-700 hover:scale-110 transition-all shadow-xl z-20">
                        <Camera size={18} />
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                      </label>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase">{user?.displayName || "User Name"}</h1>
                    <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] mt-2 bg-indigo-50 px-4 py-1.5 rounded-full">{role} Account</p>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <StatCard label="Account Status" value={role} icon={<ShieldCheck size={22}/>} theme="indigo" />
                    <StatCard label="Email Address" value={user?.email} icon={<Mail size={22}/>} theme="slate" />
                  </div>

                  <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 md:p-10">
                      <h3 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-800 uppercase tracking-tighter">
                        <User className="text-indigo-600" size={20} /> Personal Information
                      </h3>
                      <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white p-4 rounded-2xl font-bold transition-all outline-none" />
                        </div>
                        <button type="submit" disabled={saving} className="w-full bg-slate-900 hover:bg-indigo-600 text-white p-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-[0.98] disabled:opacity-50">
                          {saving ? "Updating..." : "Update Settings"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, x:10}} key="notifications" className="max-w-3xl mx-auto">
                <div className="mb-8 md:mb-10 flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Inbox</h1>
                    <p className="text-slate-500 text-sm md:text-base font-medium">Manage your activity notifications.</p>
                  </div>
                  <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase">{notifications.length} Total</div>
                </div>

                <div className="space-y-3">
                  {notifications.length > 0 ? notifications.map((note) => (
                    <motion.div layout key={note.id} className="bg-white border border-slate-200/60 p-4 rounded-[2rem] flex items-center gap-4 hover:border-indigo-200 transition-all group relative shadow-sm">
                      {getNoteIcon(note.type || note.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-xs md:text-sm mb-1 leading-tight">{note.message}</p>
                        <div className="flex items-center gap-2">
                           <Clock size={10} className="text-slate-300" />
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{note.createdAt?.toDate().toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button onClick={() => deleteDoc(doc(db, "notifications", user.uid, "userNotifications", note.id))} className="p-2 text-slate-300 hover:text-rose-500 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  )) : (
                    <div className="bg-white border border-dashed border-slate-200 rounded-[2.5rem] py-20 text-center">
                      <Bell className="text-slate-100 mx-auto mb-3" size={48} />
                      <p className="text-slate-400 text-sm font-bold tracking-tight">Empty Inbox</p>
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

const SidebarLink = ({ icon, label, active, onClick, count }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${active ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"}`}>
    <div className="flex items-center gap-3">{icon} {label}</div>
    {count > 0 && <span className={`h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-lg text-[10px] ${active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>{count}</span>}
  </button>
);

const StatCard = ({ label, value, icon, theme }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
    <div className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${theme === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'}`}>{icon}</div>
    <div className="min-w-0">
      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{label}</p>
      <p className="text-base md:text-lg font-black text-slate-800 capitalize truncate">{value}</p>
    </div>
  </div>
);

export default Dashboard;