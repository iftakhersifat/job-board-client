import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router';

const MoreDetails = () => {
    const job = useLoaderData();
    console.log(job)
    return (
        <div className='max-w-6xl mx-auto px-6 md:px-6 lg:px-0 mt-24'>
        <div className="group relative border border-transparent bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:from-blue-100 hover:to-white rounded-2xl p-6 h-[580px] md:h-[520px] flex flex-col justify-between shadow-md  transition-all duration-500">

  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

  {/* Company Info */}
  <div className="flex justify-between items-center mb-4">
    <div className="flex gap-4 items-center">
      <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
        <img
          src={job.company_logo}
          className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
          alt="Company Logo"
        />
      </div>
      <div>
        <h2 className="font-semibold text-gray-800 text-lg">{job.company}</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1"><FaLocationDot className="text-blue-500" />{job.location}</p>
      </div>
    </div>
    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium shadow hover:shadow-md transition-all duration-200">{job.jobType}
    </button>
  </div>

  {/* job details */}
  <div className="flex-1 space-y-4">
    <h2 className="font-bold text-2xl text-gray-800 group-hover:text-blue-700 transition-colors">{job.title}</h2>
    <p className="text-sm font-medium text-gray-700 bg-blue-50 inline-block px-3 py-1 rounded-md shadow-sm">
       Salary: {job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency}
    </p>
    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
      {job.description}
    </p>

    {/* skills */}
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h3>
      <div className="flex flex-wrap gap-2">
        {job.requirements?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-xs font-medium text-blue-800 border border-blue-200 rounded-full hover:scale-105 transition-transform duration-200">
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* responsibilities */}
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Responsibilities:</h3>
      <div className="flex flex-wrap gap-2">
        {job.responsibilities?.map((responsibility, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-xs rounded-full text-gray-700 hover:text-blue-600 transition-all">
            {responsibility}
          </span>
        ))}
      </div>
    </div>

    {/* HR Info */}
    <div className="pt-2 text-sm text-gray-700 space-y-1">
      <p>
        <strong>HR Name:</strong>{' '}
        <span className="text-blue-600 font-medium">{job.hr_name}</span>
      </p>
      <p>
        <strong>Email:</strong>{' '}
        <span className="text-blue-600 font-medium">{job.hr_email}</span>
      </p>
    </div>
  </div>

  {/* Apply Button */}
  <div className="mt-4 text-right">
    <Link to={`/jobApply/${job._id}`}><button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold  shadow-md hover:shadow-lg transition-all duration-300">Apply Now
    </button></Link>
  </div>
</div>

        </div>
    );
};

export default MoreDetails;