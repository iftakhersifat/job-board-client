import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider'; 
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase'; 
import { Camera, Loader2, Mail, User, BadgeCheck, Lock, CheckCircle2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const context = useOutletContext(); 
    const { user: authUser, UpdateUser } = useContext(AuthContext);
    const user = context?.user || authUser;

    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user?.displayName || user?.name || "");
        }
    }, [user]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; 
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                const imageUrl = data.data.url;
                await UpdateUser({ photoURL: imageUrl });
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, { photoURL: imageUrl });
                toast.success("Photo updated!");
            }
        } catch (error) {
            toast.error("Upload failed!");
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("Name required");

        setSaving(true);
        try {
            await UpdateUser({ displayName: name });
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { name: name });
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Update failed!");
        } finally {
            setSaving(false);
        }
    };

    if (!user) return <div className="mt-40 text-center font-medium text-slate-400 animate-pulse uppercase tracking-widest">Loading Account...</div>;

    return (
        <div className="mt-28 max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Side */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                        <div className="relative group">
                            <div className="h-64 w-64 rounded-3xl bg-slate-50 border-8 border-white overflow-hidden shadow-2xl relative ring-1 ring-slate-100">
                                {uploading ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                                        <Loader2 className="animate-spin text-indigo-600" size={32} />
                                    </div>
                                ) : (
                                    <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff`} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                        alt="Profile" />)}
                            </div>
                            <label className="absolute -bottom-4 -right-4 h-12 w-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-900 transition-all shadow-xl active:scale-90 border-4 border-white">
                                <Camera size={20} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                            </label>
                        </div>
                        
                        <div className="mt-8 w-full space-y-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                                <Shield size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Role {user?.role || 'User'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 space-y-10">
                        <div className="border-b border-slate-50 pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">
                                    {user?.displayName || "User"}
                                </h1>
                                <BadgeCheck className="text-indigo-500 fill-indigo-50" size={28} />
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 font-medium">
                                <Mail size={16} />
                                <span>{user?.email}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Account Status</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-bold text-slate-700">Verified Profile</span>
                                    <Lock size={14} className="text-emerald-500" />
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6 pt-4">
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <User size={14} /> Full Name Identity
                                </label>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        className="flex-1 px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all"
                                        placeholder="Enter full name"/>
                                    
                                    <button 
                                        type="submit" 
                                        disabled={saving}
                                        className="px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                                        {saving ? <Loader2 className="animate-spin" size={16} /> : "Update Name"}
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;