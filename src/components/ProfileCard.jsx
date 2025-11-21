import React from "react";
// import { useSelector } from "react-redux";

const ProfileCard = ({user}) => {
  // const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="w-full md:w-80 bg-base-100 self-center md:self-start rounded-2xl flex flex-col gap-5 items-center py-2 px-2 sm:py-4 sm:px-4 lg:py-4 lg:px-6">
        <div className="w-full relative flex flex-col items-center">
            <div className="bg-green-400 w-full h-24 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 absolute z-0">

            </div>
            <img
                src={user.photoUrl}
                alt=""
                className="w-32 object-cover relative mt-4 h-32 rounded-full border-4 border-gray-100"
            />
        </div>

        <div>
          <p className="text-2xl text-center font-bold">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-center">
            <span>{user.age && user.age}, {user.gender && user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</span>
          </p>
          <p className="text-sm sm:text-base text-center mt-4">{user.about}</p>
        </div>

        <div className="self-start">
          <h1 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-5 mb-4">
            Skills
          </h1>
          <div className="flex gap-2 sm:gap-2 flex-wrap justify-between">
            {user.skills.map((skill) => {
              return (
                <p key={skill} className="text-sm sm:text-sm px-3 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium rounded-lg">
                  {skill}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileCard;
