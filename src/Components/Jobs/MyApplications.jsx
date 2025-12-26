import React, { Suspense, use } from 'react';
import ApplicationList from './ApplicationList';
import { AuthContext } from '../Firebase/AuthProvider';

const myApplicationList =email=>{
     return fetch(`https://job-board-server-five.vercel.app/applications?email=${email}`)
     .then(res => res.json());
}

const MyApplications = () => {
    const {user}=use(AuthContext);
    return (
        <div>
            <Suspense>
                <ApplicationList myApplicationList ={myApplicationList(user.email)}></ApplicationList>
            </Suspense>
        </div>
    );
};

export default MyApplications;