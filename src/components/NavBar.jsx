import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate("/");
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true, }
      );

      dispatch(removeUser());
      console.log(res);
      

      navigate("/login");

    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-2xl">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      {user && <div className="hidden sm:block">Welcome, {user.firstName}</div>}
      {user && <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-8">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Link to={"/profile"}>
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
            </li>
            </Link>
            {/* <li>
              <a>Settings</a>
            </li> */}
            <li>
              <p onClick={handleLogout} >Logout</p>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default NavBar;
