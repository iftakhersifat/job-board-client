import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation, Link } from "react-router";
import { ShieldAlert, Lock, Home, ArrowLeft } from "lucide-react";

const RolePrivate = ({ children, allowedRoles }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-bars loading-lg text-indigo-600"></span>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
            Verifying Credentials
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-200 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>
          
          <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-indigo-100 rotate-3 hover:rotate-0 transition-transform duration-500">
            <ShieldAlert size={48} className="text-indigo-600" />
          </div>

          <h2 className="text-3xl font-[1000] text-slate-900 tracking-tighter uppercase italic mb-3">
            Privilege Error
          </h2>
          
          <p className="text-slate-500 font-bold text-[11px] uppercase tracking-[0.2em] mb-10 leading-relaxed">
            Your current account role <span className="text-indigo-600">({user.role})</span> does not have the necessary clearance for this sector.
          </p>

          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => window.history.back()}
              className="group w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-slate-200"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Go Back Backwards
            </button>
            
            <Link 
              to="/"
              className="w-full flex items-center justify-center gap-3 py-4 bg-white text-slate-400 border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all duration-300"
            >
              <Home size={16} /> Dashboard Home
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-center gap-3 text-slate-300">
            <Lock size={14} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Secure Session Active</span>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default RolePrivate;