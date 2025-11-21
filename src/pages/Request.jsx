import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });

    dispatch(addRequests(res?.data.data));
  };

  const handleReviewRequest = async (e, _id) => {
    const status = e.target.value;
    // console.log(_id);
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  return (
    requests && (
      <div className="w-full px-3 md:px-6 lg:px-10 xl:px-14 h-full">
        <div>
          <h1 className="text-x mb-8 font-bold md:text-2xl lg:text-3xl">
            Connections Requests
          </h1>

          {requests.length === 0 && (
            <div>You don't have any connection requests</div>
          )}

          <div className="flex flex-col gap-4">
            {requests.map((request) => {
              const { photoUrl, about, firstName, lastName, skills } =
                request.fromUserId;

              return (
                <div className="flex justify-between flex-wrap gap-4 shadow-xl border-4 border-pink-200 items-center bg-white rounded-2xl px-4 py-4 md:px-8 md:py-6">
                  <div className="flex items-center gap-4 lg:gap-6">
                    <img
                      src={photoUrl}
                      className="w-16 h-16 border rounded-full"
                      alt=""
                    />
                    <div>
                      <p className="text-xl font-medium">
                        {firstName + " " + lastName}
                      </p>
                      <p className="text-sm -mt-1 mb-[6px] text-gray-500">
                        {about}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {skills.slice(0, 3).map((skill) => {
                          return (
                            <p className="text-xs px-3 py-[2px] rounded-2xl text-blue-600 bg-blue-200">
                              {skill}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      value={"accepted"}
                      onClick={(e) => handleReviewRequest(e, request._id)}
                      className="bg-gradient-to-r font-medium text-sm from-blue-500 via-purple-500 to-pink-500 max-h-8 h-8 text-white px-4 rounded-2xl"
                    >
                      Accept
                    </button>
                    <button
                      value={"rejected"}
                      onClick={(e) => handleReviewRequest(e, request._id)}
                      className="border-2 text-sm font-medium border-pink-600 px-4 max-h-8 h-8 rounded-2xl"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Request;
