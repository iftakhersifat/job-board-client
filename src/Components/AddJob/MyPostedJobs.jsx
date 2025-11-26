import React, { Suspense, use } from 'react';
import PostedJobList from './PostedJobList';
import { AuthContext } from '../Firebase/AuthProvider';

const postedJobPromise =email=>{
    return fetch(`http://localhost:5000/jobs?email=${email}`)
    .then(res=> res.json())
}

const MyPostedJobs = () => {
    const {user} = use(AuthContext)
    return (
        <div>
            <Suspense>
                <PostedJobList postedJobPromise={postedJobPromise(user.email)}></PostedJobList>
            </Suspense>
        </div>
    );
};

export default MyPostedJobs;