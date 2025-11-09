import React from 'react';
import Banner from './Banner.jsx';
import Jobs from '../Jobs/Jobs.jsx';

// jobs gula fetch korbo
const jobsPromise =fetch('http://localhost:3000/jobs')
.then(res=>res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Jobs jobsPromise={jobsPromise}></Jobs>
        </div>
    );
};

export default Home;