import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaImage, FaLock, FaArrowRight, FaCloudUploadAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SocialRegister from './SocialRegister';
import { db } from '../Firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';

const IMGBB_API_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const Logo = () => (
  <Link to="/" className="flex items-center gap-3 outline-none group mb-8 justify-center">
    <div className="relative w-10 h-10 md:w-11 md:h-11 bg-slate-900 rounded-[12px] md:rounded-[14px] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-indigo-600 group-hover:rounded-[18px] group-hover:rotate-[10deg] shadow-lg shadow-slate-200 group-hover:shadow-indigo-200">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]"></div>
      <span className="relative z-10 text-white font-[1000] text-xl md:text-2xl italic tracking-tighter transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[10deg]">J</span>
      <div className="absolute inset-0 w-full h-full bg-linear-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>
    <div className="flex flex-col -space-y-1 text-left">
      <div className="flex items-center">
        <span className="text-xl md:text-2xl font-[1000] tracking-tighter text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">JOB</span>
        <span className="text-xl md:text-2xl font-light tracking-tighter text-indigo-600 ml-0.5">BOX</span>
        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full ml-1 animate-pulse"></span>
      </div>
      <span className="hidden md:block text-[8px] font-black uppercase tracking-[0.35em] text-slate-400 group-hover:text-slate-600">Future Pathway</span>
    </div>
  </Link>
);

const Register = () => {
  const { createUser, UpdateUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setPhotoURL(data.data.display_url);
        toast.success("Image uploaded successfully!");
      }
    } catch (err) {
      toast.error("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handelRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;

    if (!photoURL) {
      setError("Please upload a profile image.");
      return;
    }

    if (pass.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(email, pass);
      await setDoc(doc(db, "users", result.user.uid), {
        name, email, photo: photoURL, role: "user", createdAt: new Date()
      });
      await UpdateUser({ displayName: name, photoURL: photoURL });
      toast.success("Welcome to JobBox!");
      navigate(from);
    } catch (err) {
      setError(err.message || "Registration failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen -mb-24  pt-38 pb-24 p-6  bg-[#F8FAFF] flex items-center justify-center  font-sans overflow-hidden relative">
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-10 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-[100px]" />
        <motion.div animate={{ x: [0, -40, 0], y: [0, 50, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200/30 rounded-full blur-[100px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white relative z-10 overflow-hidden p-8 md:p-14">
        <div className="max-w-md mx-auto w-full">
          
          <Logo />

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Join JobBox & Start Your Journey</p>
          </header>

          <form onSubmit={handelRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input type="text" name="name" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-4 py-4 rounded-2xl font-bold transition-all outline-none text-slate-700 shadow-sm" placeholder="Enter Your Name" required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input type="email" name="email" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-4 py-4 rounded-2xl font-bold transition-all outline-none text-slate-700 shadow-sm" placeholder="your@gmail.com" required />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Photo</label>
              <div className="relative group">
                <label className="flex items-center justify-between w-full bg-slate-50 border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 px-5 py-4 rounded-2xl cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <FaCloudUploadAlt className={`text-2xl ${photoURL ? 'text-green-500' : 'text-slate-400'}`} />
                    <span className="text-sm font-bold text-slate-500">
                      {isUploading ? "Uploading..." : photoURL ? "Image Ready!" : "Upload from Gallery"}
                    </span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {photoURL && <img src={photoURL} className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" alt="Preview" />}
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input type={showPassword ? 'text' : "password"} name="password" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white pl-11 pr-12 py-4 rounded-2xl font-bold transition-all outline-none text-slate-700 shadow-sm" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors">
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-[10px] font-bold text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100 italic">⚠️ {error}</p>}

            <button type="submit" disabled={isLoading || isUploading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group relative overflow-hidden">
              <span className="relative z-10">
                {isLoading ? "Creating Profile..." : isUploading ? "Waiting for Image..." : "Create Free Account"}
              </span>
              {!isLoading && !isUploading && <FaArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-full h-[1px] bg-slate-100"></div>
              <span className="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Or Register With</span>
            </div>
            <SocialRegister from={from} />
          </div>

          <p className="text-center mt-10 text-sm font-bold text-slate-400">
            Already a member? <Link to="/login" className="text-indigo-600 hover:text-slate-900 transition-colors ml-1 border-b-2 border-indigo-50 hover:border-slate-900 pb-1">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;