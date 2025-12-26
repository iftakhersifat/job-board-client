import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaImage, FaLock, FaArrowRight, FaRocket, FaShieldAlt, FaBriefcase, FaStar, FaCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SocialRegister from './SocialRegister';
import { db } from '../Firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const { createUser, UpdateUser } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handelRegister = async (e) => {
        e.preventDefault();
        setError('');
        
        const name = e.target.name.value;
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const photo = e.target.photo.value;

        // User Friendly Check
        if (pass.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);

        try {
            const result = await createUser(email, pass);
            await setDoc(doc(db, "users", result.user.uid), {
                name, email, photo, role: "user", createdAt: new Date()
            });
            await UpdateUser({ displayName: name, photoURL: photo });
            toast.success("Welcome to Job-Box!");
            navigate(from);
        } catch (err) {
            setError(err.message || "Registration failed.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative -mb-20">
            
            {/* Background Animations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div 
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }} 
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-10 left-10 w-72 h-72 bg-indigo-200/40 rounded-full blur-[100px]" 
                />
                <motion.div 
                    animate={{ x: [0, -40, 0], y: [0, 50, 0] }} 
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200/40 rounded-full blur-[100px]" 
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-6xl mt-18  grid grid-cols-1 lg:grid-cols-12 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white relative z-10 overflow-hidden"
            >
                
                {/* --- Left Column: Unique Visuals --- */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#818CF8] p-12 hidden lg:flex flex-col justify-between relative">
                    <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-16">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg rotate-12">
                                <FaRocket className="text-indigo-600" />
                            </div>
                            <span className="text-white font-black text-xl tracking-tighter uppercase">JobBox</span>
                        </div>
                        
                        <h2 className="text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                            Land your <br /> 
                            <span className="text-indigo-900/40 italic font-medium">next-level</span> <br /> 
                            dream role.
                        </h2>
                        <p className="text-indigo-100/90 font-medium text-lg leading-relaxed mb-10 max-w-[280px]">
                            Join 50k+ elite professionals building the future of work.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-white font-bold bg-white/10 p-4 rounded-2xl border border-white/10">
                                <FaBriefcase className="text-indigo-200" />
                                <span className="text-sm italic">Curated premium job listings</span>
                            </div>
                            <div className="flex items-center gap-4 text-white font-bold bg-white/10 p-4 rounded-2xl border border-white/10">
                                <FaShieldAlt className="text-indigo-200" />
                                <span className="text-sm italic">Verified company network</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="bg-white/10 p-6 rounded-[2.5rem] backdrop-blur-md border border-white/20">
                            <div className="flex gap-1 text-yellow-300 mb-2 italic">
                                <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                            </div>
                            <p className="text-indigo-100 text-sm italic font-medium">"Registration was seamless and the opportunities are endless."</p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-indigo-500 bg-indigo-300" />
                                    <div className="w-8 h-8 rounded-full border-2 border-indigo-500 bg-blue-300" />
                                </div>
                                <p className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <FaCircle className="text-green-400 text-[6px] animate-pulse" /> Join 20k+ Talent
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: High-End Form --- */}
                <div className="lg:col-span-7 p-8 md:p-14 lg:p-20 bg-white">
                    <div className="max-w-md mx-auto w-full">
                        <header className="mb-8 text-center lg:text-left">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Create Account</h1>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Fill in your details to get started.</p>
                        </header>

                        <form onSubmit={handelRegister} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group focus-within:ring-2 ring-indigo-100 rounded-2xl transition-all">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600" />
                                        <input type="text" name="name" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl font-bold transition-all outline-none text-slate-700" placeholder="John Doe" required />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group focus-within:ring-2 ring-indigo-100 rounded-2xl transition-all">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600" />
                                        <input type="email" name="email" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl font-bold transition-all outline-none text-slate-700" placeholder="name@site.com" required />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Image Link</label>
                                <div className="relative group focus-within:ring-2 ring-indigo-100 rounded-2xl transition-all">
                                    <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600" />
                                    <input type="text" name="photo" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-4 py-3.5 rounded-2xl font-bold transition-all outline-none text-slate-700" placeholder="https://image-link.com" required />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                                <div className="relative group focus-within:ring-2 ring-indigo-100 rounded-2xl transition-all">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600" />
                                    <input type={showPassword ? 'text' : "password"} name="password" 
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-12 py-3.5 rounded-2xl font-bold transition-all outline-none text-slate-700" 
                                        placeholder="••••••••" required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors">
                                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-bold text-rose-500 bg-rose-50 p-2.5 rounded-xl border border-rose-100 italic">⚠️ {error}</motion.p>}

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4 relative overflow-hidden group"
                            >
                                <span className="relative z-10">{isLoading ? "Creating Profile..." : "Create Free Account"}</span>
                                {!isLoading && <FaArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                            </button>
                        </form>

                        <div className="mt-8">
                            <div className="relative flex items-center justify-center mb-6">
                                <div className="absolute w-full h-[1px] bg-slate-100"></div>
                                <span className="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Social Registration</span>
                            </div>
                            <SocialRegister from={from} />
                        </div>

                        <p className="text-center mt-8 text-sm font-bold text-slate-400">
                            Already a member? <Link to="/login" className="text-indigo-600 hover:text-slate-900 transition-colors ml-1 border-b-2 border-indigo-50 hover:border-slate-900 pb-1">Sign In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;