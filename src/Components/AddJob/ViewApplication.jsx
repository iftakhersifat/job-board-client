import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";
import { db } from "../Firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { FaFileAlt, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const ViewApplication = () => {
  const { id } = useParams();
  const loaderApplications = useLoaderData();
  const [applications, setApplications] = useState(loaderApplications);

  const handleStatus = async (e, applicationID, applicantUID, index) => {
  const newStatus = e.target.value;

  try {
    // Update MongoDB (backend fetches email from DB)
    const res = await axios.patch(
      `http://localhost:5000/applications/${applicationID}`,
      { status: newStatus, applicantUID }
    );

    if (res.data.modifiedCount) {
      // Update UI after success
      const updatedApplications = [...applications];
      updatedApplications[index] = {
        ...updatedApplications[index],
        status: newStatus,
      };
      setApplications(updatedApplications);

      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Firestore notification
      if (applicantUID) {
        await addDoc(
          collection(db, "notifications", applicantUID, "userNotifications"),
          {
            message: `Your application status has been updated to "${newStatus}"`,
            type: "application",
            createdAt: serverTimestamp(),
          }
        );
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to update status",
        text: "No changes were made in the backend.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text 
        bg-linear-to-r from-blue-600 to-violet-600 py-4 md:py-6">
          Applicants Overview
        </h1>
        <p className="text-gray-600">Manage and review all applications at one place.</p>
      </div>

      {/* Applicants List */}
      <div className="grid grid-cols-1 gap-6">
        {applications.map((app, index) => (
          <div
            key={app._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              {/* Left Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Applicant #{index + 1}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  <span className="font-semibold">Name:</span> {app.applicant}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Email:</span> {app.applicantEmail}
                </p>
              </div>

              {/* Status Dropdown */}
              <div>
                <select
                  value={app.status || ""}
                  onChange={(e) => handleStatus(e, app._id, app.applicantUID, index)}
                  className="select select-bordered select-md rounded-xl bg-white dark:bg-gray-700"
                >
                  <option disabled value="">
                    Update Status
                  </option>
                  <option>Pending</option>
                  <option>Call For Interview</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>

            {/* Links Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Resume */}
              <a
                href={app.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-700 
                hover:bg-blue-100 transition"
              >
                <FaFileAlt />
                <span className="font-semibold">Resume</span>
              </a>

              {/* LinkedIn */}
              {app.linkedIn && (
                <a
                  href={app.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-700
                  hover:bg-blue-100 transition"
                >
                  <FaLinkedin />
                  <span className="font-semibold">LinkedIn</span>
                </a>
              )}

              {/* GitHub */}
              {app.github && (
                <a
                  href={app.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-gray-100 text-gray-900
                  hover:bg-gray-200 transition"
                >
                  <FaGithub />
                  <span className="font-semibold">GitHub</span>
                </a>
              )}

              {/* Portfolio */}
              {app.portfolio && (
                <a
                  href={app.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-purple-50 text-purple-700
                  hover:bg-purple-100 transition"
                >
                  <FaGlobe />
                  <span className="font-semibold">Portfolio</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplication;
