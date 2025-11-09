import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from './Firebase';

export const AuthContext = createContext(null);

// for register with google
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser]= useState(null);

    // new user create (register)
    const createUser =(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // user login (login)
    const userLogin =(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // for check if user stay login or logout
    useEffect(()=>{
        const userCheck=onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        });
        return ()=>{
            userCheck();
        }
    },[])

    // log out
    const logOut =()=>{
        return signOut(auth);
    }

    // register with google 
    const registerWithGoogle =()=>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    // update user profile
    const UpdateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData).then(() => {
      setUser({...auth.currentUser});
    });
  };




    const authInfo={
        createUser,
        userLogin,
        logOut,
        registerWithGoogle,
        UpdateUser,

        user,

        loading,
        setLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;