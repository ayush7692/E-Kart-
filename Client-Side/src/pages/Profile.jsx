
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.auth.user);

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        <div className="bg-blue-800 text-white p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white text-blue-800 flex items-center justify-center text-4xl font-bold">
            <img
              // src={`https://ui-avatars.com/api/?name=${user?.name}&background=fff&color=000&size=256 `}
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Naruto&backgroundColor=ffad33"
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          </div>

          <h2 className="text-2xl font-bold mt-4">{user?.name}</h2>
          <p className="text-blue-100">{user?.email}</p>
        </div>


        <div className="p-6 space-y-4">
          <div className="border rounded-lg p-4">
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="font-semibold text-lg">{user?.name}</p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500 text-sm">Email Address</p>
            <p className="font-semibold text-lg">{user?.email}</p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="font-semibold text-lg">
              {user?.phone || "Not Added"}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500 text-sm">Role</p>
            <p className="font-semibold text-lg capitalize">{user?.role}</p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500 text-sm">Joined On</p>
            <p className="font-semibold text-lg">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

