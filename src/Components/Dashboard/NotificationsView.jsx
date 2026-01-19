import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Firebase/AuthProvider'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2, Clock, CheckCircle, XCircle, ShieldCheck, Calendar, Inbox, Loader2 } from 'lucide-react';
import { deleteDoc, doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import toast from 'react-hot-toast';

const NotificationsView = () => {
  const { user } = useContext(AuthContext); 
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
        console.log("Waiting for user session...");
        return;
    };

    console.log("User found, fetching notifications for:", user.uid);

    const q = query(
      collection(db, "notifications", user.uid, "userNotifications"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      
      setNotifications(list);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Snapshot Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", user.uid, "userNotifications", id));
      toast.success("Notification cleared");
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  const getNoteIcon = (type) => {
    const iconBase = "h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 ";
    switch (type) {
      case 'Hired': return <div className={iconBase + "bg-emerald-50 text-emerald-600"}><CheckCircle size={22}/></div>;
      case 'Rejected': return <div className={iconBase + "bg-rose-50 text-rose-600"}><XCircle size={22}/></div>;
      case 'Call For Interview': return <div className={iconBase + "bg-amber-50 text-amber-600"}><Calendar size={22}/></div>;
      case 'role_update': return <div className={iconBase + "bg-indigo-50 text-indigo-600"}><ShieldCheck size={22}/></div>;
      default: return <div className={iconBase + "bg-slate-50 text-slate-400"}><Bell size={22}/></div>;
    }
  };

  if (loading && !user) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader2 className="animate-spin text-indigo-600" size={32} />
      <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Identifying Session...</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-28 px-6 pb-20 animate-in fade-in duration-500">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Inbox</h1>
          <p className="text-slate-400 font-bold text-sm mt-1">Updates on your activity.</p>
        </div>
        <div className="bg-slate-900 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
          {notifications.length} Messages
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode='popLayout'>
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <motion.div 
                layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                key={note.id} 
                className="bg-white border border-slate-100 p-6 rounded-[2.2rem] flex items-center gap-6 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-slate-100/50 group">
                {getNoteIcon(note.type || note.status)}
                
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-md leading-tight mb-2 group-hover:text-indigo-600 transition-colors capitalize">
                    {note.message}
                  </p>
                  <div className="flex items-center gap-2 text-slate-400 font-black text-[9px] uppercase tracking-wider">
                    <Clock size={12} className="text-indigo-400" />
                    {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(note.id)} 
                  className="h-10 w-10 flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer group-hover:text-rose-400">
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3.5rem] py-32 text-center">
              <Inbox className="mx-auto mb-4 text-slate-200" size={48} />
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic">Inbox is empty</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationsView;