import React, { use } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router';

const Jobs = ({jobsPromise}) => {
    const jobs = use(jobsPromise)
    console.log(jobs)
    return (
        <div className='max-w-6xl mx-auto'>
            <div className="text-center py-14 px-6 relative">
  {/* Background Accent */}
  {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-purple-50 opacity-80 -z-10"></div> */}

  {/* Decorative Blurs */}
  {/* <div className="absolute -top-20 -right-16 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full blur-3xl opacity-30 -z-10"></div>
  <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-gradient-to-tr from-purple-300 to-blue-200 rounded-full blur-3xl opacity-30 -z-10"></div> */}

  {/* Title */}
  <h1 className="text-4xl md:text-5xl font-extrabold mt-6 leading-snug">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600">
      Hot Jobs
    </span>
  </h1>

  {/* Accent Line */}
  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-3 rounded-full"></div>

  {/* Description */}
  <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-base md:text-lg">
    Discover the latest career opportunities and apply to positions that align
    with your passion and expertise. Stay ahead of the competition with today’s top openings.
  </p>
</div>




            <div className='grid grid-cols-1 md:grid-cols-3 px-6 md:px-6 lg:px-0 gap-4'>
                {jobs.map(job=>(
                    <div key={job._id} className="group relative border border-transparent bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white shadow-md hover:shadow-xl rounded-2xl p-6 h-[440px] md:h-[480px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-1">
  {/* Decorative Accent */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

  {/* Company Info */}
  <div className="flex gap-4 items-center mb-4">
    <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
      <img
        src={job.company_logo}
        alt="Company Logo"
        className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div>
      <h2 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
        {job.company}
      </h2>
      <p className="flex gap-1 items-center text-sm text-gray-500 mt-1">
        <FaLocationDot className="text-blue-500" />
        {job.location}
      </p>
    </div>
  </div>

  {/* Job Details */}
  <div className="flex-1 space-y-3">
    <h2 className="font-bold text-2xl text-gray-800 leading-snug group-hover:text-blue-700 transition-colors duration-300">
      {job.title}<span className="text-blue-500 font-medium text-base">({job.jobType})</span>
    </h2>

    <p className="text-sm font-medium text-gray-700 bg-gradient-to-r from-blue-100 to-blue-50 inline-block px-3 py-1 rounded-md shadow-sm">
    {job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency}
    </p>

    <p className="text-gray-600 text-sm">
      {job.description}
    </p>

    {/* Skills */}
    <div className="flex flex-wrap gap-2 mt-4">
      {job.requirements?.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-xs font-semibold text-blue-800 rounded-full hover:scale-105 hover:shadow-sm transition-all duration-200"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>

  <div className="mt-6">
    <Link to={`/jobs/${job._id}`}><button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">More Details
    </button></Link>
  </div>
          </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;