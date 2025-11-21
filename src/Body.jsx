import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import RightMenu from "./components/RightMenu";
import BottomNavigation from "./components/BottomNavigation";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const fetchLogginUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));

      if (res.data && location.pathname === "/login") {
        navigate("/");
      }
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogginUser();
  }, []);

  return (
    <div className="bg-neutral-content min-h-screen pb-16 sm:pb-10">
      <NavBar />

      <div className={`${user && "flex"} justify-between mt-5`}>
        <Outlet />
        
        {/* Bottom Navigation for Mobile */}
        <BottomNavigation />

        {user && <RightMenu />}
      </div>
    </div>
  );
};

export default Body;
