import React from 'react';
import { Link } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#f8fafc]">
            
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[120px] opacity-60"></div>

            <div className="relative z-10 text-center px-6">
                <div className="relative inline-block">
                    <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-slate-900 opacity-[0.04]">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-b from-slate-800 to-slate-500 bg-clip-text text-transparent">
                            Oops!
                        </h2>
                    </div>
                </div>

                <div className="max-w-md mx-auto -mt-4 md:-mt-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                        Lost in the Cloud?
                    </h3>
                    <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>


                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-300 hover:bg-indigo-600 hover:-translate-y-1 transition-all duration-300"
                        >
                            <Home size={20} />
                            Go Back Home
                        </Link>
                        
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all duration-300"
                        >
                            <ArrowLeft size={20} />
                            Previous Page
                        </button>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200/60">
                        <p className="text-sm text-slate-400 mb-4 font-medium uppercase tracking-widest">
                            Need help?
                        </p>
                        <div className="flex justify-center gap-8 text-sm font-bold text-slate-500">
                            <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Support</Link>
                            <Link to="/jobs" className="hover:text-indigo-600 transition-colors">Browse Jobs</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute hidden lg:block top-20 right-40 animate-bounce duration-[3000ms]">
                <Search className="text-slate-200" size={48} />
            </div>
        </div>
    );
};

export default NotFound;