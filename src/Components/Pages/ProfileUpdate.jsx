import React, { useContext, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";



const ProfileUpdate = () => {
  const { user, UpdateUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();

    // যদি কিছুই change না করে তাহলে alert
    if (!displayName && !photoURL) {
      console.log("Please fill in at least one field");
      return;
    }

    UpdateUser({ displayName, photoURL })
      .then(() => {
        console.log("Profile updated successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="label">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new name"
            />
          </div>

          <div>
            <label className="label">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new photo URL"
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Update Profile
          </button>
        </form>

        {/* show current info */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Current Info</h3>
          <img
            src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
            alt="profile"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <p className="font-medium">{user?.displayName || "No name set"}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
