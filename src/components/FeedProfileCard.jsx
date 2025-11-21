import React from "react";
import { Heart, X } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const FeedProfileCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
    user;

    const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removeFeed(_id));
      


    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden p-4">
      {/* Gradient image section */}
      <div className="bg-gradient-to-tr from-purple-500 to-blue-400 rounded-2xl p-1">
        <img
          src={photoUrl}
          alt="Profile"
          className="w-full h-52 object-cover rounded-2xl"
        />
      </div>

      {/* Content section */}
      <div className="mt-5 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-500">
          {age}, {gender}
        </p>

        <p className="mt-3 text-gray-600 text-sm px-3">{about}</p>

        {/* Skills */}
        <div className="mt-4 text-left">
          <p className="text-sm font-semibold font-bold text-gray-700 mb-2">
            Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {skills &&
              skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-3 items-center mt-6 px-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex items-center gap-2 text-gray-600 bg-gray-100 px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition"
          >
            <X size={18} />
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 rounded-full font-medium hover:opacity-90 transition"
          >
            <Heart size={18} className="fill-white" />
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedProfileCard;
