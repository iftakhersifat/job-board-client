import React from 'react';
import { useOutletContext } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2, Clock, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import toast from 'react-hot-toast';

const NotificationsView = () => {
  const { notifications = [], user } = useOutletContext() || {};

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", user.uid, "userNotifications", id));
      toast.success("Notification cleared");
    } catch (e) { toast.error("Failed to delete"); }
  };

  const getNoteIcon = (type) => {
    const base = "h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ";
    if (type === 'Hired') return <div className={base + "bg-emerald-50 text-emerald-600"}><CheckCircle size={20}/></div>;
    if (type === 'Rejected') return <div className={base + "bg-rose-50 text-rose-600"}><XCircle size={20}/></div>;
    if (type === 'role_update') return <div className={base + "bg-indigo-50 text-indigo-600"}><ShieldCheck size={20}/></div>;
    return <div className={base + "bg-slate-50 text-slate-400"}><Bell size={20}/></div>;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inbox</h1>
          <p className="text-slate-500 font-medium mt-1">Updates on your applications and account.</p>
        </div>
        <div className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-xl text-[11px] font-black uppercase">
          {notifications.length} Unread
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode='popLayout'>
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <motion.div 
                layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                key={note.id} 
                className="bg-white border border-slate-100 p-5 rounded-3xl flex items-center gap-5 hover:border-indigo-100 transition-all shadow-sm group"
              >
                {getNoteIcon(note.type || note.status)}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-[14px] leading-tight mb-1">{note.message}</p>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase">
                    <Clock size={12} />
                    {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString() : 'Just now'}
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(note.id)} 
                  className="p-2.5 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] py-24 text-center">
              <Bell className="mx-auto mb-4 text-slate-200" size={48} />
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Inbox is empty</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationsView;