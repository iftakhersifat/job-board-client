import { Navigate, useLocation, Link } from "react-router";
import { AuthContext } from "./AuthProvider";
import { use } from "react";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";

const AdminPrivate = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8FAFC]">
        <span className="loading loading-bars loading-lg text-indigo-600"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
          
          <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-rose-100">
            <ShieldAlert size={40} className="text-rose-500" />
          </div>

          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-3">
            Security Block
          </h2>
          
          <p className="text-slate-500 font-bold text-[11px] uppercase tracking-[0.2em] mb-8 leading-relaxed">
            Unauthorized Entry Detected. This terminal is restricted to level-1 administrators only.
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => window.history.back()}
              className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <ArrowLeft size={14} /> Return to Safety
            </button>
            
            <Link 
              to="/"
              className="w-full flex items-center justify-center gap-2 py-4 bg-white text-slate-400 border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-2 text-slate-300">
            <Lock size={12} />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">End-to-End Encrypted Access</span>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminPrivate;