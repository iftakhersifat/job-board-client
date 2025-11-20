import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobCard from "../SearchJobs/JobCard";

const CategoryJobs = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/jobs").then((res) => {
      const filtered = res.data.filter(
        (job) => job.category === decodedCategory
      );
      setJobs(filtered);
    });
  }, [decodedCategory]);

  return (
    <div className="max-w-6xl mx-auto mt-16 px-6 md:px-6 lg:px-0">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">{decodedCategory}</h1>
      <p className="text-gray-600 mb-8">Showing jobs under this category</p>

      {jobs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-500">No Jobs Found</h2>
          <p className="text-gray-400">No jobs available for this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryJobs;
