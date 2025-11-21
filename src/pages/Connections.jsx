import axios from "axios";
import { CheckIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ProfileCard from "../components/ProfileCard";

const Connections = () => {
  const dispatch = useDispatch();

  const [viewUser, setViewUser] = useState(null);

  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });

    console.log(res);

    dispatch(addConnections(res?.data.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>You don't have any connections</h1>;

  const handleViewProfile = (user) => {
    setViewUser(user);
    document.getElementById("my_modal_2").showModal()
  }

  return (
    connections && (
      <div className="w-full px-3 md:px-6 lg:px-10 xl:px-14 ">
        <div>
          <h1 className="text-xl mb-8 font-bold md:text-2xl lg:text-3xl">
            Your Connections
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5  w-full">
          {/* {console.log(connections)} */}
          {connections.map((user) => {
            return (
              <div className="flex shadow-xl flex-col gap-3 bg-white rounded-2xl px-3 sm:px-5 py-3 sm:py-6 md:py-8">
                <img
                  src={user?.photoUrl}
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-gray-400"
                />
                <div>
                  <h1 className="text-xl font-medium">
                    {user.firstName + " " + user.lastName}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Developer on DevTinder
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {user?.skills.slice(0, 3).map((skill) => {
                      return (
                        <p className="text-xs px-3 py-1 rounded-2xl text-blue-600 bg-blue-200">
                          {skill}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between gap-2 flex-wrap items-center items-center mt-2">
                  <p className="flex gap-[2px] text-sm text-green-600 font-medium items-center">
                    <CheckIcon size={18} /> Connecton
                  </p>
                  <button onClick={() => handleViewProfile(user)} className="bg-gradient-to-r text-sm from-blue-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-2xl">
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box p-0 bg-transparent shadow-none">
            <ProfileCard user={viewUser} />
          </div>
          
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    )
  );
};

export default Connections;
