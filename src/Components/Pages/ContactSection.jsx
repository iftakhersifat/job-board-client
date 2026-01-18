import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiTwitter, FiFacebook } from "react-icons/fi";

const ContactSection = () => {
  return (
    <section className="py-38 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-indigo-200">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            {/* Left Side: Contact Info */}
            <div className="p-12 lg:p-20 bg-indigo-600 text-white">
              <h2 className="text-4xl font-black mb-6 leading-tight">
                Got Questions? <br />
                <span className="text-indigo-200">Let's Connect.</span>
              </h2>
              <p className="text-indigo-100 font-medium mb-12 text-lg">
                Our team is here to help you navigate your career journey. Reach out anytime!
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">Email Us</p>
                    <p className="text-xl font-bold">support@jobportal.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">Call Us</p>
                    <p className="text-xl font-bold">+880 1234 567 890</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">Office</p>
                    <p className="text-xl font-bold">Gulshan, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-16 flex gap-4">
                {[FiLinkedin, FiTwitter, FiFacebook].map((Icon, index) => (
                  <a key={index} href="#" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-all duration-300">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="p-12 lg:p-20 bg-white">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-900 font-black text-xs uppercase mb-2 tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-900 font-black text-xs uppercase mb-2 tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="yourgmail@example.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs uppercase mb-2 tracking-wider">Subject</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all font-medium appearance-none">
                    <option>General Inquiry</option>
                    <option>Job Application Help</option>
                    <option>Employer Support</option>
                    <option>Technical Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs uppercase mb-2 tracking-wider">Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <button className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                  <span>Send Message</span>
                  <FiSend size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;