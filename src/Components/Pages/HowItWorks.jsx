import React from 'react';
import { FaUserPlus, FaFileAlt, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create Account",
      desc: "Join our community and build your professional profile.",
      icon: <FaUserPlus />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Upload Resume",
      desc: "Highlight your expertise and get noticed by recruiters.",
      icon: <FaFileAlt />,
      color: "from-indigo-600 to-purple-600"
    },
    {
      id: 3,
      title: "Get Hired",
      desc: "Apply to top roles and start your dream career today.",
      icon: <FaCheckCircle />,
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
        
        <div className="text-center mb-20">
          <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
            How It <span className="text-indigo-600">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-slate-100 -z-10"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="group text-center">
              <div className="relative inline-flex mb-8">
                <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${step.color} text-white flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center text-xs font-black text-slate-900 shadow-sm">
                  {step.id}
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight italic">{step.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[250px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 relative rounded-[3.5rem] overflow-hidden group shadow-[0_35px_60px_-15px_rgba(79,70,229,0.3)]">
          <div className="absolute inset-0 bg-indigo-600"></div>
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-12 md:p-16">
            <div className="max-w-md text-center lg:text-left">
              <h4 className="text-3xl md:text-4xl font-black text-white italic leading-tight uppercase">
                Stay Updated With <br /> <span className="text-indigo-200">Job Alerts</span>
              </h4>
              <p className="text-indigo-100/70 mt-4 font-medium italic">
                Get the latest career opportunities delivered straight to your inbox.
              </p>
            </div>

            <div className="w-full max-w-md">
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-5 px-8 text-white placeholder:text-indigo-200/50 outline-none focus:border-white transition-all font-medium"
                />
                <button className="absolute right-3 p-4 bg-white text-indigo-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-lg active:scale-95">
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;