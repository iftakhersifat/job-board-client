import React from 'react';
import Banner from './Banner.jsx';
import Jobs from '../Jobs/Jobs.jsx';
import CategorySection from '../AddJob/CategorySection.jsx';
import BannerSection from './BannerSection.jsx';
import TopBrands from './TopBrands.jsx';
import JobStats from './JobStats.jsx';
import CandidateTestimonials from './CandidateTestimonials.jsx';
import HowItWorks from './HowItWorks.jsx';

const jobsPromise =fetch('https://job-board-server-five.vercel.app/jobs')
.then(res=>res.json())

const Home = () => {
    return (
        <div>
            <BannerSection />
            <JobStats />
            
            <CategorySection></CategorySection>
            <Jobs jobsPromise={jobsPromise}></Jobs>

            <HowItWorks />
            <TopBrands />
            <CandidateTestimonials />     
        </div>
    );
};

export default Home;