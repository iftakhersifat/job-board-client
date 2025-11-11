import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import { AuthContext } from '../Firebase/AuthProvider';

const Register = () => {
    // for create user
    const {createUser, UpdateUser}=use(AuthContext)

    // navigate kora
    const navigate =useNavigate();
    const location =useLocation()
    const from = location.state || "/"



    const[showPassword, setShowPassword]=useState(false);
    const handelRegister=e=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email =e.target.email.value;
        const pass = e.target.password.value;
        const photo = e.target.photo.value;
        console.log(name,email,pass,photo)

        // for create new user
        createUser(email, pass).then(result=>{
            const user = result.user;
            console.log("New user created:", user);
            navigate("/")

          UpdateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            console.log("Profile updated!");
            navigate(from);
          })
          .catch(err => console.error("Profile update failed:", err));
        }).catch(error=>{
            console.log("Error creating user:", error)
        })
    }
    return (
        <div>
            <div className="hero w-full mt-24">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card w-full  md:w-[400px] shrink-0 shadow-2xl">
      <div className="card-body">
        
        {/* form section */}
        <form onSubmit={handelRegister}>
          <fieldset className="fieldset">
          {/* name input */}
          <label className="label">Name</label>
          <input type="text" name="name" className="input w-full" placeholder="Your Name"/>

          {/* email section */}
          <label className="label">Email</label>
          <input type="email" name='email' className="input w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Your Email" />

          {/* photo url input */}
          <label className="label">Photo URL</label>
          <input type="text" name="photo" placeholder="Enter your photo URL" className="input input-bordered w-full"/>

          {/* password section */}
          <label className="label">Password</label>
          <div className='relative'>
            <input type={showPassword? 'text': "password"} name='password' className="input w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Your Password" />
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute mt-3 -ml-10">
                {showPassword? "Hide" : "Show"}
            </button>
          </div>
          <div><a className="link link-hover">Forgot password?</a></div>

          {/* register with gmail */}
          <SocialLogin from={from}></SocialLogin>
          <button className="btn btn-neutral mt-4 text-white bg-blue-500 hover:bg-blue-700 border-0">Register</button>
          <Link to="/login" className='mt-3'>Do you have an account? <span className='text-red-500 underline'>Login</span></Link>

        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;