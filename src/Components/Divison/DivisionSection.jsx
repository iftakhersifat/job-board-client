import React from "react";
import { jobLocations } from "../../Data/jobLocations";
import { Link } from "react-router";
import { FiChevronRight, FiMapPin } from "react-icons/fi";

const DivisionSection = () => {
  const divisions = Object.keys(jobLocations);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {divisions.map((d, index) => (
          <Link
            key={index}
            to={`/division/${encodeURIComponent(d)}`}
            className="group relative flex items-center justify-between p-3.5 bg-white border border-slate-200/60 rounded-2xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_12px_24px_-8px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 overflow-hidden">

            <div className="absolute inset-0 bg-indigo-50/40 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-bold text-[14px] text-slate-800 group-hover:text-indigo-700 transition-colors">
                  {d}
                </span>
                <span className="text-[10px] font-medium text-slate-400 group-hover:text-indigo-500/70 uppercase tracking-widest transition-colors">
                  Jobs Near You
                </span>
              </div>
            </div>

            <div className="relative z-10 p-1 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
              <FiChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DivisionSection;