import React from "react";
import { jobLocations } from "../../Data/jobLocations";
import { Link } from "react-router";
import { FiMapPin } from "react-icons/fi";

const DivisionSection = () => {
  const divisions = Object.keys(jobLocations);

  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {divisions.map((d, index) => (
          <Link
            key={index}
            to={`/division/${encodeURIComponent(d)}`}
            className="group relative bg-white border border-slate-200 hover:border-indigo-400 p-3 rounded-2xl transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(79,70,229,0.1)] hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
          >
            {/* Background Accent on Hover */}
            <div className="absolute inset-0 bg-indigo-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

            {/* Icon & Text */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors"></div>
                <span className="font-bold text-[13px] md:text-sm text-slate-600 group-hover:text-indigo-700 transition-colors">
                  {d}
                </span>
              </div>
              
              {/* Count Indicator (Mockup - looks real) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <FiMapPin size={12} className="text-indigo-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Dynamic Tagline below divisions */}
      <div className="mt-6 flex items-center gap-2 px-2">
         <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
           Regional job markets are updated every hour
         </p>
      </div>
    </div>
  );
};

export default DivisionSection;