import React, { forwardRef } from "react";

import { CiViewTimeline } from "react-icons/ci";
import { TfiTimer } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { FiBarChart2 } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  AiOutlineFileProtect,
  AiOutlineTeam,
  AiOutlineTag,
  AiOutlineSetting,
} from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

const Slider = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const childFunction = () => {
    onOpen();
  };

  const hideSidebar = () => {
    onClose();
  };
  React.useImperativeHandle(ref, () => ({
    childFunction,
  }));

  return (
    <Drawer
      size="xs"
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader display="flex" alignItems="center" gap="20px">
          <Box onClick={hideSidebar} className="cursor-pointer">
            <RxHamburgerMenu size={25} />
          </Box>
          <Box fontSize="26px" className="mb-[4px] font-semibold text-blue-400">
            Clockify
          </Box>
        </DrawerHeader>

        <DrawerBody>
          <NavLink
            to="/timesheet"
            className=" relative flex items-center gap-[12px] py-[.7143rem]  after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <CiViewTimeline size={26} />
            </div>
            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              TIMESHEET
            </div>
          </NavLink>
          <NavLink
            to="/tracker"
            className=" relative flex items-center gap-[12px] py-[.7143rem]   after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <TfiTimer size={26} />
            </div>

            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              TIME TRACKER
            </div>
          </NavLink>
          <NavLink
            to="/calendar"
            className=" relative  flex items-center gap-[12px] py-[.7143rem]  after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <HiOutlineCalendarDays size={26} />
            </div>

            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              CALENDAR
            </div>
          </NavLink>

          <div className=" mt-[12px] mb-[5px] text-[#999] text-[12px] ">
            ANALYZE
          </div>

          <NavLink
            to="/dashboard"
            className=" relative flex items-center gap-[12px] py-[.7143rem]   after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0">
            <div>
              <RxDashboard size={26} />
            </div>

            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap ">
              DASHBOARD
            </div>
          </NavLink>
          <NavLink
            to="/reports"
            className=" relative flex items-center gap-[12px] py-[.7143rem]   after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <FiBarChart2 size={26} />
            </div>

            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              REPORTS
            </div>
          </NavLink>

          <div className=" mt-[12px] mb-[5px] text-[#999] text-[12px] ">
            MANAGE
          </div>

          <NavLink
            to="/projects"
            className=" relative flex items-center gap-[12px] py-[.7143rem]  after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <AiOutlineFileProtect size={26} />
            </div>
            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              PROJECTS
            </div>
          </NavLink>
          <NavLink
            to="/teams"
            className=" relative flex items-center gap-[12px] py-[.7143rem]  after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <AiOutlineTeam size={26} />
            </div>

            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              TEAMS
            </div>
          </NavLink>
          <NavLink
            to="/client"
            className=" relative  flex items-center gap-[12px] py-[.7143rem]  after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <IoPersonOutline size={26} />
            </div>

            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              CLIENT
            </div>
          </NavLink>
          <NavLink
            to="/tags"
            className=" relative  flex items-center gap-[12px] py-[.7143rem]  after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <AiOutlineTag size={26} />
            </div>

            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              TAGS
            </div>
          </NavLink>
          <NavLink
            to="/settings"
            className=" relative flex items-center gap-[12px] py-[.7143rem]  after:h-full after:w-0 hover:after:w-full after:transition-all after:-z-50 z-20  after:bg-gray-200 after:absolute  after:inset-0 ">
            <div>
              <AiOutlineSetting size={26} />
            </div>

            <div className="text-[#03a9f4] mt-[2px] whitespace-nowrap">
              SETTING
            </div>
          </NavLink>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});

export default Slider;
