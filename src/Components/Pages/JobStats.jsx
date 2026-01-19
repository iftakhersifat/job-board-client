import React from 'react';
import { FaUsers, FaBriefcase, FaBuilding, FaAward } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const JobStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    {
      id: 1,
      count: 12500,
      suffix: "+",
      label: "Active Jobs",
      icon: <FaBriefcase />,
      sub: "Handpicked roles",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: 2,
      count: 850,
      suffix: "+",
      label: "Top Companies",
      icon: <FaBuilding />,
      sub: "Verified partners",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      id: 3,
      count: 52000,
      suffix: "+",
      label: "Candidates",
      icon: <FaUsers />,
      sub: "Expert talent",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 4,
      count: 98,
      suffix: "%",
      label: "Success Rate",
      icon: <FaAward />,
      sub: "Quality hiring",
      gradient: "from-pink-600 to-rose-600"
    }
  ];

  return (
    <div ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div 
              key={item.id} 
              className="group relative p-[1px] rounded-[2.5rem] bg-linear-to-b from-slate-100 to-transparent hover:from-indigo-500 transition-all duration-500">
              <div className="relative h-full bg-white p-10 rounded-[2.5rem] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${item.gradient} text-white flex items-center justify-center text-xl mb-8 shadow-xl shadow-indigo-200/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                      {inView ? <CountUp end={item.count} duration={2.5} separator="," /> : "0"}
                    </h3>
                    <span className="text-2xl font-black text-indigo-600">{item.suffix}</span>
                  </div>
                  
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-3 mb-6">
                    {item.label}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-[2px] bg-slate-100 overflow-hidden">
                        <div className={`h-full bg-linear-to-r ${item.gradient} w-0 group-hover:w-full transition-all duration-1000 ease-out`}></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase italic">
                      {item.sub}
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobStats;