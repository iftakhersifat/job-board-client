import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider'; 
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase'; 
import { Camera, Loader2, ShieldCheck, Mail, User, BadgeCheck, Lock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const { user } = useOutletContext(); 
    const { UpdateUser } = useContext(AuthContext);

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
                
                toast.success("Profile photo updated!");
            }
        } catch (error) {
            toast.error("Image upload failed!");
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("Name cannot be empty");

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

    if (!user) return <div className="p-10 text-center font-black text-slate-300 tracking-widest">LOADING PROFILE...</div>;

    return (
        <div className="max-w-5xl mx-auto p-2 md:p-6 animate-in fade-in duration-700">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
                
                <div className="h-40 bg-slate-900 relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute top-6 right-8">
                         <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                            {user?.role || 'User'} Member
                         </div>
                    </div>
                </div>

                <div className="px-6 md:px-12 pb-12">
                    <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 gap-8 mb-12">
                        <div className="relative group">
                            <div className="h-48 w-48 rounded-[3rem] bg-slate-100 border-[10px] border-white overflow-hidden shadow-2xl relative">
                                {uploading ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
                                        <Loader2 className="animate-spin text-indigo-600" size={32} />
                                    </div>
                                ) : (
                                    <img 
                                        src={user?.photoURL} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        alt="Profile" 
                                    />
                                )}
                            </div>
                            <label className="absolute bottom-2 right-2 h-12 w-12 bg-indigo-600 text-white rounded-2xl border-4 border-white flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:scale-110 transition-all shadow-xl z-20">
                                <Camera size={20} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                            </label>
                        </div>

                        <div className="flex-1 text-center md:text-left pb-4">
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none">
                                    {user?.displayName || "Member"}
                                </h1>
                                <BadgeCheck className="text-indigo-600" size={32} />
                            </div>
                            <p className="text-slate-400 font-bold text-sm mt-2">{user?.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 border-t border-slate-100">
                        <div className="lg:col-span-5 space-y-4">
                            <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Account Overview</h3>
                            
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Mail size={12}/> Primary Email
                                </p>
                                <p className="font-bold text-slate-800 break-all">{user?.email}</p>
                                <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-rose-400 uppercase">
                                    <Lock size={12}/> Verified & Locked
                                </div>
                            </div>

                            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Current Role</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <p className="font-black text-indigo-900 capitalize text-lg">{user?.role || 'User'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter mb-8 flex items-center gap-3">
                                    <User size={20} className="text-indigo-600" /> Edit Display Identity
                                </h3>
                                
                                <form onSubmit={handleUpdate} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl font-bold text-slate-800 outline-none transition-all"
                                            placeholder="Update your name"/>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={saving}
                                        className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">
                                        {saving ? (
                                            <Loader2 className="animate-spin" size={18} />
                                        ) : (
                                            <>
                                                <CheckCircle2 size={18} />
                                                Update Profile Now
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;