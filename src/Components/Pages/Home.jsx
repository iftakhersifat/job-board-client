import React from 'react';
import Banner from './Banner.jsx';
import Jobs from '../Jobs/Jobs.jsx';
import CategorySection from '../AddJob/CategorySection.jsx';
import BannerSection from './BannerSection.jsx';
import TopBrands from './TopBrands.jsx';
import JobStats from './JobStats.jsx';

// jobs gula fetch korbo
const jobsPromise =fetch('https://job-board-server-five.vercel.app/jobs')
.then(res=>res.json())

const Home = () => {
    return (
        <div>
            {/* <Banner></Banner> */}
            <BannerSection></BannerSection>
            
            <CategorySection></CategorySection>
            <Jobs jobsPromise={jobsPromise}></Jobs>

            <TopBrands></TopBrands>

            <JobStats></JobStats>
        </div>
    );
};

export default Home;