import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const RightMenu = () => {
  const menuItems = ["Feed", "Profile", "Connections", "Request"];
  const [activeMenuItem, setActiveMenuItem] = useState("Feed");
  const [isOpen, setIsOpen] = useState(true);
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
    <div
      className={`bg-base-100 rounded-2xl py-4
      sticky top-5 
      hidden sm:block
      ${isOpen ? "w-44 min-w-44" : "w-16 min-w-16"}
      h-[90vh]
      `}
    >
      <ul>
        <div className="mx-6 mb-2 inline-block">
          <MenuIcon size={25} onClick={() => setIsOpen(!isOpen)} />
        </div>
        {isOpen &&
          menuItems.map((val) => (
            <Link key={val} to={val === "Feed" ? "/" : "/" + val.toLowerCase()}>
              <li
                onClick={() => setActiveMenuItem(val)}
                className={`py-4 border-b px-6 text-sm border-b-gray-300 cursor-pointer transition-all duration-200
                ${
                  activeMenuItem === val
                    ? "bg-pink-100 border-l-8 border-l-pink-500 font-semibold text-pink-700"
                    : "border-l-8 border-l-transparent hover:border-l-gray-400"
                }`}
              >
                {val}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default RightMenu;
