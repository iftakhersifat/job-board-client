import React, { use } from 'react';

const Jobs = ({jobsPromise}) => {
    const jobs = use(jobsPromise)
    console.log(jobs)
    return (
        <div>
            <p>{jobs.length}</p>
        </div>
    );
};

export default Jobs;