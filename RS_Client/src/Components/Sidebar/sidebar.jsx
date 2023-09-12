import { CiViewTimeline } from "react-icons/ci";
import { TfiTimer } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { FiBarChart2 } from "react-icons/fi";
import { Tooltip } from "@chakra-ui/react";
import {
  AiOutlineFileProtect,
  AiOutlineTeam,
  AiOutlineTag,
  AiOutlineSetting,
} from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";

function Sidebar(props) {
  return (
    <>
      <div
        className={`bg-white  hidden md:block border-r border-gray-300 transition-all  duration-300 ${
          props.sidebar ? "w-[200px]" : "w-[80px]"
        }`}>
        <Tooltip
          py="10px"
          label="Timiesheet"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/timesheet"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <CiViewTimeline size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in">
                TIMESHEET
              </div>
            )}
          </NavLink>
        </Tooltip>
        <Tooltip
          py="10px"
          label="Tracker"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/tracker"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <TfiTimer size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in">
                TIME TRACKER
              </div>
            )}
          </NavLink>
        </Tooltip>
        <Tooltip
          py="10px"
          label="Calendar"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/calendar"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <HiOutlineCalendarDays size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in">
                CALENDAR
              </div>
            )}
          </NavLink>
        </Tooltip>
        {props.sidebar && (
          <div className="ml-[25px] mt-[12px] mb-[5px] text-[#999] text-[12px] animate-fade-in">
            ANALYZE
          </div>
        )}
        <Tooltip
          py="10px"
          label="Dashboard"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/dashboard"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <RxDashboard size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in ">
                DASHBOARD
              </div>
            )}
          </NavLink>
        </Tooltip>
        <Tooltip
          py="10px"
          label="Reports"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/reports"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <FiBarChart2 size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in ">
                REPORTS
              </div>
            )}
          </NavLink>
        </Tooltip>
        {props.sidebar && (
          <div className="ml-[25px] mt-[12px] mb-[5px] text-[#999] text-[12px] animate-fade-in ">
            MANAGE
          </div>
        )}
        <Tooltip
          py="10px"
          label="Projects"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/projects"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <AiOutlineFileProtect size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in ">
                PROJECTS
              </div>
            )}
          </NavLink>
        </Tooltip>
        <Tooltip
          py="10px"
          label="Teams"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/teams"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <AiOutlineTeam size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in ">
                TEAMS
              </div>
            )}
          </NavLink>
        </Tooltip>
        <Tooltip
          py="10px"
          label="Clients"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/client"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <IoPersonOutline size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in ">
                CLIENT
              </div>
            )}
          </NavLink>
        </Tooltip>
        <Tooltip
          py="10px"
          label="Tags"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/tags"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <AiOutlineTag size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in ">
                TAGS
              </div>
            )}
          </NavLink>
        </Tooltip>
        <Tooltip
          py="10px"
          label="Setting"
          hasArrow
          fontSize="md"
          placement="right"
          isDisabled={props.sidebar}>
          <NavLink
            to="/settings"
            className=" relative pr-[30px] flex items-center gap-[12px] py-[.7143rem]  px-[1.4286rem] after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <AiOutlineSetting size={26} />
            </div>
            {props.sidebar && (
              <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap animate-fade-in ">
                SETTING
              </div>
            )}
          </NavLink>
        </Tooltip>
      </div>
    </>
  );
}

export default Sidebar;
