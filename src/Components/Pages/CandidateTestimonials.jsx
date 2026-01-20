import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';

const CandidateTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineer",
      image: "/assets/t-1.jpeg",
      text: "I found my dream job at a top tech company within just two weeks of signing up. The process was incredibly smooth and efficient!",
      rating: 5
    },
    {
      id: 2,
      name: "David Chen",
      role: "UI/UX Designer",
      image: "/assets/t-2.jpeg",
      text: "The platform's job matching algorithm is brilliant. I received relevant job alerts that perfectly matched my skill set and portfolio.",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah Miller",
      role: "Marketing Specialist",
      image: "/assets/t-3.jpeg",
      text: "Best career resource I've ever used. The interface is clean, and contacting recruiters directly was a game changer for my career.",
      rating: 4
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Project Manager",
      image: "/assets/t-4.jpeg",
      text: "Highly recommended for professionals! I was able to track my applications and get interview calls from multiple verified companies.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-50 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              What Our <span className="text-indigo-600">Candidates</span> Say
            </h2>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-1 bg-slate-100 rounded-full">
              <div className="w-12 h-full bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="testimonial-swiper !pb-16">
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group relative p-[1px] rounded-[3rem] bg-gradient-to-b from-slate-100 to-transparent hover:from-indigo-500 transition-all duration-500 h-full">
                <div className="relative bg-white p-10 rounded-[3rem] h-full flex flex-col justify-between overflow-hidden">
                  <FaQuoteLeft className="absolute top-8 right-10 text-slate-50 text-6xl group-hover:text-indigo-50 transition-colors duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-sm ${i < item.rating ? 'text-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    
                    <p className="text-slate-600 font-medium leading-relaxed mb-10 italic">
                      "{item.text}"
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg leading-none mb-1">{item.name}</h4>
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      
    </section>
  );
};

export default CandidateTestimonials;