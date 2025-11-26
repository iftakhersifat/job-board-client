import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import JobCard from "../SearchJobs/JobCard";

const SearchJobsPage = () => {
  const { searchTerm } = useParams();
  const decodedTerm = decodeURIComponent(searchTerm);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5000/jobs")
      .then((res) => {
        const filtered = res.data.filter((job) =>
          job.title.toLowerCase().includes(decodedTerm.toLowerCase())
        );
        setJobs(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [decodedTerm]);

  return (
    <div className="max-w-6xl mx-auto mt-16 px-6 md:px-6 lg:px-0">
      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Search Results for: "{decodedTerm}"
      </h1>
      <p className="text-gray-600 mb-8">Showing matching jobs</p>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner text-info w-8 h-8"></span>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-500">No Jobs Found</h2>
          <p className="text-gray-400">
            No jobs match your search query.
          </p>
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

export default SearchJobsPage;
