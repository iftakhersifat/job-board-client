import React, { Suspense, use } from 'react';
import ApplicationList from './ApplicationList';
import { AuthContext } from '../Firebase/AuthProvider';

const myApplicationList =email=>{
     return fetch(`http://localhost:3000/applications?email=${email}`)
     .then(res => res.json());
}

const MyApplications = () => {
    const {user}=use(AuthContext);
    return (
        <div>
            <Suspense fallback={'loading your applications'}>
                <ApplicationList myApplicationList ={myApplicationList(user.email)}></ApplicationList>
            </Suspense>
        </div>
    );
};

export default MyApplications;