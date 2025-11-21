import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Feed");
  //   const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveMenuItem("Feed");
    else if (path.startsWith("/request")) setActiveMenuItem("Request");
    else if (path.startsWith("/profile")) setActiveMenuItem("Profile");
    else if (path.startsWith("/connections")) setActiveMenuItem("Connections");
    else setActiveMenuItem("");
  }, [location.pathname]);

  return (
    <div className="sm:hidden bg-gray-600 text-white fixed bottom-0 left-0 right-0 bg-base-100 shadow-md border-t border-gray-300 flex justify-around z-50">
      {["Feed", "Profile", "Connections", "Request"].map((val) => (
        <Link
          key={val}
          to={val === "Feed" ? "/" : "/" + val.toLowerCase()}
          className="flex flex-col items-center text-sm"
        >
          <span
            className={`py-3 font-semibold px-2 ${
              activeMenuItem === val
                ? "bg-pink-100  text-pink-700"
                : "border-l-8 border-l-transparent hover:border-l-gray-400"
            }`}
            onClick={() => setActiveMenuItem(val)}
          >
            {val}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
