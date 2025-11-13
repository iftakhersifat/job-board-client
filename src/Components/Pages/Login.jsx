import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import SocialLogin from './SocialLogin';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    // for user login
    const {userLogin}=use(AuthContext);

    // navigate kora
    const navigate = useNavigate()
    const location =useLocation()
    const from = location.state || "/"


    const [showPassword, setShowPassword] = useState(false);
    const handelLogin=e=>{
        e.preventDefault();

        const email = e.target.email.value;
        const pass = e.target.password.value;
        console.log(email,pass)

        // user login
        userLogin(email,pass).then(result=>{
            console.log(result);
            toast.success("Login Successfully", { duration: 3000 });
            navigate(from)
        }).catch(error=>{
            toast.error(error.message || "Login failed", { duration: 4000 });
        })
    }
    return (
        <div>
            <div className="hero w-full mt-24">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card w-full  md:w-[400px] shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Login Now!</h1>
        <form onSubmit={handelLogin}>
          <fieldset className="fieldset">

          <label className="label">Email</label>
          <input type="email" name='email' className="input w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Your Email" />

          <label className="label">Password</label>
          <div className='relative'>
            <input type={showPassword? 'text': "password"} name='password' className="input w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Your Password" />
            <button type="button"  onClick={()=>setShowPassword(!showPassword)} className="absolute mt-4 -ml-6">
                {showPassword? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
          </div>

          <div><a className="link link-hover">Forgot password?</a></div>

          <SocialLogin from={from}></SocialLogin>
          <button className="btn btn-neutral mt-4 text-white bg-blue-500 hover:bg-blue-700 border-0">Login</button>
          
          <div className="text-center text-sm mt-3 text-gray-600">
            <Link to="/register" className='mt-3'>Don't have an account? <span className='text-red-500 underline'>Register</span></Link>
          </div>

        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;