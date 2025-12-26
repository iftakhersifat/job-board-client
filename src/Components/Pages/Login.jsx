import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import SocialLogin from './SocialLogin';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowRight, FaRocket, FaStar, FaCircle, FaFingerprint } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
    const { userLogin } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handelLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const email = e.target.email.value;
        const pass = e.target.password.value;

        try {
            await userLogin(email, pass);
            toast.success("Welcome back Buddy!", { duration: 3000 });
            navigate(from);
        } catch (err) {
            setError("Invalid email or password. Please try again.");
            setIsLoading(false);
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFF] -mb-20 flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative">
            
            {/* --- Background Animations --- */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div 
                    animate={{ x: [0, -50, 0], y: [0, -30, 0] }} 
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-20 right-20 w-72 h-72 bg-blue-200/40 rounded-full blur-[100px]" 
                />
                <motion.div 
                    animate={{ x: [0, 40, 0], y: [0, -50, 0] }} 
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-200/40 rounded-full blur-[100px]" 
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-6xl mt-18 grid grid-cols-1 lg:grid-cols-12 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white relative z-10 overflow-hidden"
            >
                
                {/* --- Left Column: Impact Visuals (Consistent with Register) --- */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#4338CA] p-12 hidden lg:flex flex-col justify-between relative">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-16">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg rotate-12">
                                <FaRocket className="text-indigo-900" />
                            </div>
                            <span className="text-white font-black text-xl tracking-tighter uppercase">JobBox</span>
                        </div>
                        
                        <h2 className="text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                            Welcome <br /> 
                            <span className="text-indigo-400 italic font-medium">Back to</span> <br /> 
                            Success.
                        </h2>
                        <p className="text-indigo-200/90 font-medium text-lg leading-relaxed mb-10 max-w-[280px]">
                            Log in to access your personalized dashboard and newest job matches.
                        </p>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
                                    <FaFingerprint className="text-indigo-300" />
                                </div>
                                <p className="text-white font-bold text-sm">Secure Authentication</p>
                             </div>
                             <p className="text-indigo-200/70 text-xs leading-relaxed">
                                We use enterprise-grade encryption to ensure your professional data remains private and protected.
                             </p>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="bg-white/10 p-6 rounded-[2.5rem] backdrop-blur-md border border-white/20">
                            <div className="flex gap-1 text-yellow-400 mb-2 italic">
                                <FaStar size={10}/><FaStar size={10}/><FaStar size={10}/><FaStar size={10}/><FaStar size={10}/>
                            </div>
                            <p className="text-indigo-100 text-sm italic font-medium">"JobBox is my daily tool for career growth. Highly recommended!"</p>
                            <div className="mt-4 flex items-center gap-3">
                                <p className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <FaCircle className="text-green-400 text-[6px] animate-pulse" /> 12.4k Professionals Online
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Login Form --- */}
                <div className="lg:col-span-7 p-8 md:p-14 lg:p-20 bg-white">
                    <div className="max-w-md mx-auto w-full">
                        <header className="mb-10 text-center lg:text-left">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Sign In</h1>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Enter your credentials to continue.</p>
                        </header>

                        <form onSubmit={handelLogin} className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                                <div className="relative group focus-within:ring-2 ring-indigo-100 rounded-2xl transition-all">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                    <input type="email" name="email" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-4 py-4 rounded-2xl font-bold transition-all outline-none text-slate-700 shadow-sm" placeholder="email@example.com" required />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Pass</label>
                                    <button type="button" className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest transition-colors">Forgot?</button>
                                </div>
                                <div className="relative group focus-within:ring-2 ring-indigo-100 rounded-2xl transition-all">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                    <input type={showPassword ? 'text' : "password"} name="password" 
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-12 py-4 rounded-2xl font-bold transition-all outline-none text-slate-700 shadow-sm" 
                                        placeholder="••••••••" required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors">
                                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-bold text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100 italic text-center">⚠️ {error}</motion.p>}

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-6 relative overflow-hidden group"
                            >
                                <span className="relative z-10">{isLoading ? "Verifying..." : "Secure Login"}</span>
                                {!isLoading && <FaArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-indigo-950 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                            </button>
                        </form>

                        <div className="mt-10">
                            <div className="relative flex items-center justify-center mb-8">
                                <div className="absolute w-full h-[1px] bg-slate-100"></div>
                                <span className="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Easy Access</span>
                            </div>
                            
                            <SocialLogin from={from} />
                        </div>

                        <p className="text-center mt-10 text-sm font-bold text-slate-400">
                            New to JobBox? <Link to="/register" className="text-indigo-600 hover:text-slate-900 transition-colors ml-1 border-b-2 border-indigo-50 hover:border-slate-900 pb-1">Create Account</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;