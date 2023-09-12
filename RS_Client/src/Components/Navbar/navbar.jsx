import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavMenu from "./navMenu";
import Sidebar from "../Sidebar/sidebar";
import Slider from "../Sidebar/slidebar";
import { useRef } from "react";

function Navbar() {
  const childRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const [togglelink, settogglelink] = useState(false);

  const togglelinkhandler = () => {
    settogglelink(!togglelink);
  };

  const [sidebar, setsidebar] = useState(false);

  const moveSidebar = () => {
    setsidebar(!sidebar);
  };
  const openSlidebar = () => {
    if (childRef.current) {
      childRef.current.childFunction();
    }
  };
  const [showmenu, setShowmenu] = useState(false);
  const togglemenu = () => {
    setShowmenu(!showmenu);
  };

  const hideMenu = () => {
    setShowmenu(false);
  };

  return (
    <div className="h-screen bg-[#f2f6f8]">
      <div
        className={` flex justify-between  px-[25px]  items-center   mx-auto  ${
          user
            ? "w-full bg-white py-[8px] border-b border-gray-300"
            : "md:w-[70%] py-[20px] "
        }`}>
        <div className="flex gap-[15px] items-center">
          {user && (
            <>
              <div
                onClick={moveSidebar}
                className="md:block hidden mt-[4px] cursor-pointer">
                <RxHamburgerMenu size={25} />
              </div>
              <div
                onClick={openSlidebar}
                className="md:hidden block mt-[4px] cursor-pointer">
                <RxHamburgerMenu size={25} />
              </div>
            </>
          )}
          <div
            className={`${
              user ? "text-[26px]" : "text-[36px]"
            }  font-semibold text-blue-400`}>
            Clockify
          </div>
        </div>
        {user ? (
          <div>
            <div className="relative ">
              <div
                onClick={togglemenu}
                className="rounded-full text-white bg-purple-700 p-[5px] cursor-pointer">
                {user.name}
              </div>
              {showmenu && <NavMenu />}
            </div>
          </div>
        ) : (
          <div>
            {togglelink ? (
              <div className="flex gap-[5px] items-center">
                <div className="text-gray-400 font-normal text-[14px]">
                  Don't have account?
                </div>
                <Link
                  onClick={togglelinkhandler}
                  to="/register"
                  className="text-blue-400 font-medium text-[15px]">
                  Sign up
                </Link>
              </div>
            ) : (
              <Link
                onClick={togglelinkhandler}
                to="/login"
                className="text-blue-400 font-medium text-[15px]">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
      <div onClick={hideMenu} className={`${user && "flex"}`}>
        {user && <Sidebar sidebar={sidebar} />}
        {user && <Slider ref={childRef} />}

        <div className="overflow-auto  h-[calc(100vh_-_56px)] flex-1">
          <div className="pt-[40px] py-[15px] px-[15px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
