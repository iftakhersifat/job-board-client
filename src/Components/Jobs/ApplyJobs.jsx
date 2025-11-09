import React, { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const ApplyJobs = () => {
    const {id}= useParams();
    const {user}=use(AuthContext)
    console.log(id)

    // navigate 
    const navigate = useNavigate();

    const handleApplyForm=e=>{
        e.preventDefault();

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const portfolio = e.target.portfolio.value;
        const linkedIn = e.target.linkedin.value;
        const github = e.target.github.value;
        const resume = e.target.resume.value;
        console.log(fullName, email, phone, portfolio, linkedIn, github, resume);

        const application ={
            id,
            applicant : user.email,
            fullName,
            email,
            phone,
            portfolio,
            linkedIn,
            github,
            resume
        }

        axios.post("http://localhost:3000/applications", application)
        .then(res=> {
            if(res.data.insertedId){
                Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your Application has been Submitted",
                showConfirmButton: false,
                timer: 1500
            }).then(()=>{
                navigate('/myApplications');
            })
            }
        })
        .catch(error=> console.log(error))
    }
    return (
        <div className='mt-24'>
            <form 
  onSubmit={handleApplyForm} 
  className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-0"
>
  <fieldset className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md">
    <legend className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Provide Your Details</legend>

    <div className="mb-4">
  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
    Full Name
  </label>
  <input
    required
    type="text"
    id="fullName"
    name="fullName"
    placeholder="Your Full Name"
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
  />
</div>

<div className="mb-4">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
    Email
  </label>
  <input
    required
    type="email"
    id="email"
    name="email"
    placeholder="Your Email"
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
  />
</div>

<div className="mb-4">
  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
    Phone Number
  </label>
  <input
    type="tel"
    id="phone"
    name="phone"
    placeholder="Your Phone Number"
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
  />
</div>


    {/* LinkedIn */}
    <div className="mb-4">
      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        LinkedIn Profile
      </label>
      <input
      required
        type="url"
        id="linkedin"
        name="linkedin"
        placeholder="Your LinkedIn profile link"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
      />
    </div>

    {/* GitHub */}
    <div className="mb-4">
      <label  htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        GitHub Profile
      </label>
      <input
      required
        type="url"
        id="github"
        name="github"
        placeholder="Your GitHub profile link"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
      />
    </div>

    {/* Portfolio Link */}
    <div className="mb-4">
      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Portfolio Link
      </label>
      <input
        type="url"
        id="portfolio"
        name="portfolio"
        placeholder="Your Portfolio website link"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
      />
    </div>

    {/* Resume */}
    <div className="mb-6">
      <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Resume Link
      </label>
      <input
      required
        type="url"
        id="resume"
        name="resume"
        placeholder="Your Resume link"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
      />
    </div>

    {/* Terms & Conditions */}
    <div className="mb-6 flex items-center">
      <input
        required
        type="checkbox"
        id="terms"
        name="terms"
        className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-200">
        I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a>
      </label>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
    >
      Apply Now
    </button>
  </fieldset>
</form>
        </div>
    );
};

export default ApplyJobs;