// import React from "react";
// import { motion } from "framer-motion";
// import { Briefcase, Globe2, Users2, Target, Star, Building2 } from "lucide-react";

// const AboutUs = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#eef5ff] via-white to-[#e7efff]">

//       {/* Header */}
//       <section className="py-20 px-6 text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent"
//         >
//           About Our Company
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg"
//         >
//           We help people find better jobs and help companies find better talent.
//           Our platform combines modern technology with a human-centered approach to
//           create a recruitment experience that’s simple, transparent, and trustworthy.
//         </motion.p>
//       </section>

//       {/* Stats Section */}
//       <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
//         {[
//           { icon: <Users2 size={36} />, title: "50,000+", desc: "Registered Job Seekers" },
//           { icon: <Building2 size={36} />, title: "2,500+", desc: "Partner Companies" },
//           { icon: <Globe2 size={36} />, title: "120+", desc: "Daily New Job Posts" },
//         ].map((item, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.15 }}
//             className="bg-white p-8 rounded-2xl text-center shadow-xl border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
//           >
//             <div className="flex justify-center mb-4 text-blue-600">{item.icon}</div>
//             <h2 className="text-3xl font-extrabold text-gray-800">{item.title}</h2>
//             <p className="text-gray-500 mt-1">{item.desc}</p>
//           </motion.div>
//         ))}
//       </section>

//       {/* Mission / Values */}
//       <section className="max-w-6xl mx-auto px-6 py-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="bg-white p-10 rounded-2xl shadow-md border border-gray-100"
//           >
//             <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-xl mb-5">
//               <Target className="text-blue-600" size={32} />
//             </div>
//             <h3 className="text-3xl font-bold text-gray-800 mb-3">Our Mission</h3>
//             <p className="text-gray-600 leading-relaxed">
//               To empower job seekers with better opportunities and help companies hire more efficiently
//               through intelligent automation, real-time analytics, and transparent communication.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="bg-white p-10 rounded-2xl shadow-md border border-gray-100"
//           >
//             <div className="bg-yellow-100 w-16 h-16 flex items-center justify-center rounded-xl mb-5">
//               <Star className="text-yellow-600" size={32} />
//             </div>
//             <h3 className="text-3xl font-bold text-gray-800 mb-3">Our Values</h3>
//             <ul className="space-y-3 text-gray-600">
//               <li>✔ Transparency in communication</li>
//               <li>✔ Fair hiring for all applicants</li>
//               <li>✔ Technology-driven solutions</li>
//               <li>✔ Commitment to continuous improvement</li>
//             </ul>
//           </motion.div>
//         </div>
//       </section>

//       {/* Company History */}
//       <section className="px-6 py-16 bg-white/60 backdrop-blur">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//             Our Journey
//           </h2>

//           <div className="space-y-8">
//             {[
//               {
//                 year: "2021",
//                 text: "Platform launched with basic job posting features.",
//               },
//               {
//                 year: "2022",
//                 text: "Reached 10,000 job seekers and partnered with 200 companies.",
//               },
//               {
//                 year: "2023",
//                 text: "Introduced AI-based job recommendations & advanced dashboard.",
//               },
//               {
//                 year: "2024",
//                 text: "Expanded to nationwide recruitment and enterprise hiring tools.",
//               },
//             ].map((event, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white p-6 rounded-xl shadow border border-gray-100"
//               >
//                 <h4 className="text-xl font-bold text-blue-600">{event.year}</h4>
//                 <p className="text-gray-600 mt-1">{event.text}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20 px-6">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           Meet Our Leadership Team
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
//           {[
//             { name: "Shawon Ahmed", role: "Founder & CEO" },
//             { name: "Hasan Rahim", role: "CTO" },
//             { name: "Karim Uddin", role: "Product Manager" },
//           ].map((person, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-center"
//             >
//               <img
//                 src={`https://ui-avatars.com/api/?name=${person.name}&background=random&size=256`}
//                 alt={person.name}
//                 className="w-24 h-24 rounded-full mx-auto mb-4 shadow"
//               />
//               <h3 className="text-xl font-bold text-gray-800">{person.name}</h3>
//               <p className="text-gray-500">{person.role}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default AboutUs;
