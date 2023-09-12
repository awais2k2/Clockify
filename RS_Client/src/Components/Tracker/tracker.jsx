import { AiOutlineTag } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useState, useRef } from "react";
import { CiTimer } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDown } from "react-icons/ai";
import { Box, useOutsideClick, useToast } from "@chakra-ui/react";
import TrackerItem from "./trackerItems";
import { projectAction, reportAction } from "../../Store";
import axios from "axios";

export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toFixed()
    .toString()
    .padStart(2, "0")}`;
};

function Tracker() {
  const ref = useRef();
  const dispatch = useDispatch();
  const allprojects = useSelector((state) => state.project.projects);
  const user = useSelector((state) => state.user.user);
  const reports = useSelector((state) => state.report.reports);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reporting/${user.id}/trackings`)
      .then((res) => {
        dispatch(reportAction.addReports(res.data));
      })
      .catch((error) => {});
    axios
      .post(`${process.env.REACT_APP_API_URL}/projects/projects`, {
        userId: user.id,
      })
      .then((res) => {
        dispatch(projectAction.addProjects(res.data));
      })
      .catch((error) => {});
  }, []);

  const [time, setTime] = useState(0);
  const toast = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const startTimeDisplayRef = useRef("");
  const stopTimeDisplayRef = useRef("");
  const [showManual, setShowManual] = useState(true);
  const [manualTime, setManualTime] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isBlue, setIsBlue] = useState(false);
  const [discription, setDiscription] = useState("");

  const handleClick = () => {
    setIsBlue(!isBlue);
  };

  useEffect(() => {
    setProjects(allprojects);
  }, [allprojects]);

  useEffect(() => {
    if (startDate && endDate) {
      calculateManualTime();
    }
  }, [startDate, endDate]);

  const updateDisplayTimes = () => {
    const currentTime = new Date();
    if (isRunning) {
      stopTimeDisplayRef.current = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    } else {
      startTimeDisplayRef.current = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    }
  };

  const startStopwatch = () => {
    if (isRunning) {
      if (selectedProject === null && selectedTask === null) {
        toast({
          position: "top-right",
          title: "Select any project or task",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      updateDisplayTimes();
      const dataToSend = {
        starttime: startTimeDisplayRef.current,
        endtime: stopTimeDisplayRef.current,
        totaltime: time,
        isbillable: isBlue,
        userId: user.id,
        taskId: selectedTask && selectedTask.id,
        projectId: selectedProject && selectedProject.id,
        dis: discription,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}/reporting`, dataToSend)
        .then(() => {
          setTime(0);
          setShowManual(true);
          clearInterval(intervalRef.current);
          setSelectedProject(null);
          setStartDate("");
          setEndDate("");
          setIsBlue(false);
          setSelectedTask(null);
          setDiscription("");
          toast({
            position: "top-right",
            title: "Report has been added",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          axios
            .get(
              `${process.env.REACT_APP_API_URL}/reporting/${user.id}/trackings`
            )
            .then((res) => {
              dispatch(reportAction.addReports(res.data));
            })
            .catch((error) => {});
        })
        .catch((err) => {
          toast({
            position: "top-right",
            title: err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      setShowManual(false);
      startTimeRef.current = Date.now() - time * 1000;
      intervalRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }
    updateDisplayTimes();
    setIsRunning(!isRunning);
  };
  const calculateManualTime = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const timeDifferenceInSeconds = Math.floor(
      (endDateObj - startDateObj) / 1000
    );
    setTime(timeDifferenceInSeconds);
  };

  useOutsideClick({
    ref: ref,
    handler: () => {
      setShowDropdown(false);
    },
  });
  function extractTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  const registerReport = () => {
    if (selectedProject === null && selectedTask === null) {
      toast({
        position: "top-right",
        title: "Select any project or task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    updateDisplayTimes();
    const dataToSend = {
      starttime: extractTime(startDate),
      endtime: extractTime(endDate),
      totaltime: time,
      isbillable: isBlue,
      userId: user.id,
      taskId: selectedTask && selectedTask.id,
      projectId: selectedProject && selectedProject.id,
      dis: discription,
      date: startDate,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/reporting`, dataToSend)
      .then(() => {
        setTime(0);
        setStartDate("");
        setEndDate("");
        setIsBlue(false);
        clearInterval(intervalRef.current);
        setSelectedProject(null);
        setSelectedTask(null);
        setDiscription("");
        toast({
          position: "top-right",
          title: "Report has been added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/reporting/${user.id}/trackings`
          )
          .then((res) => {
            dispatch(reportAction.addReports(res.data));
          })
          .catch((error) => {});
      })
      .catch((err) => {
        toast({
          position: "top-right",
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const groupedReports = {};

  reports.forEach((report) => {
    const date = new Date(report.Date).toLocaleDateString("en-US");
    const projectAndTask = report.task
      ? `${report.project.name} - ${report.task.name}`
      : report.project.name;

    if (!groupedReports[date]) {
      groupedReports[date] = {};
    }

    if (!groupedReports[date][projectAndTask]) {
      groupedReports[date][projectAndTask] = {
        reports: [],
        totalProjectTime: 0,
        totalTaskTime: 0,
      };
    }

    const group = groupedReports[date][projectAndTask];
    if (report.task) {
      group.totalTaskTime += report.totaltime;
    } else {
      group.totalProjectTime += report.totaltime;
    }

    group.reports.push(report);
  });

  const addPreviousReport = (report) => {
    updateDisplayTimes();
    setTime(0);
    setIsBlue(report.isbillable);
    setSelectedProject(report.project);
    setSelectedTask(report.task);
    startStopwatch();
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(date, today)) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else {
      return formatDistanceToNow(date, { addSuffix: true });
    }
  }

  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  return (
    <div className="">
      <div className="bg-white flex xl:flex-row flex-col  xl:items-center p-[12px] gap-[15px]  border border-gray-300">
        <div className="flex flex-1 items-center gap-[15px]">
          <input
            onChange={(e) => {
              setDiscription(e.target.value);
            }}
            value={discription}
            type="text"
            placeholder={
              manualTime ? "What have u worked" : "What are u working on "
            }
            className=" hover:ring-1 focus:ring-1 focus:outline-none pl-[6px] ring-gray-300 flex-1 py-[8px] "
          />
          <div className="relative">
            {selectedProject || selectedTask ? (
              <Box className="flex gap-[5px] items-center">
                <Box
                  bg={selectedProject.statuscolor}
                  className={`h-2 w-2 rounded-full`}></Box>
                <Box
                  color={selectedProject.statuscolor}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`hover:underline cursor-pointer font-bold`}>
                  {selectedProject.name}
                  {selectedTask && `:${selectedTask.name}`}
                </Box>
              </Box>
            ) : (
              <button
                className="text-blue-500 font-medium flex  items-center hover:underline "
                onClick={() => setShowDropdown(!showDropdown)}>
                <IoIosAddCircleOutline className="mt-[2px] text-[18px]" />
                <div className="text-[16px]"> Project</div>
              </button>
            )}
            {showDropdown && (
              <div
                ref={ref}
                className="absolute z-50 top-[40px] right-0 lg:w-[380px] md:w-[350px] sm:w-[300px] base:w-[250px] bg-white border border-gray-300 shadow-md p-4 max-h-[400px] overflow-y-scroll">
                <input
                  type="text"
                  placeholder="Search projects or tasks..."
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
                <ul className="mt-2 transition-all duration-300">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <div className="text-gray-400 mb-[5px]">
                        {project.client.name}
                      </div>
                      <li
                        key={project.id}
                        className="peer relative group flex justify-between   hover:bg-gray-100 p-2 rounded-md transition-all duration-300">
                        <Box
                          className="cursor-pointer"
                          color={project.statuscolor}
                          fontWeight="semibold"
                          onClick={() => {
                            setShowDropdown(false);
                            setSelectedProject(project);
                            setSelectedTask(null);
                          }}>
                          {project.name.toUpperCase()}
                        </Box>
                        <div>
                          {project.tasks.length > 0 && (
                            <div>
                              <div className="flex  items-center cursor-pointer hover:underline gap-[5px] ">
                                {project.tasks.length}
                                Tasks
                                <AiOutlineDown size={14} className="mt-[3px]" />
                              </div>
                              <div className="group-hover:flex flex-col gap-[10px] mt-[10px] font-semibold   hidden ">
                                {project.tasks.map((task) => {
                                  return (
                                    <div
                                      key={task.id}
                                      className="cursor-pointer hover:underline transition-all duration-300 animate-fade-in"
                                      onClick={() => {
                                        setShowDropdown(false);
                                        setSelectedProject(project);
                                        setSelectedTask(task);
                                      }}>
                                      {task.name.toUpperCase()}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className=" xl:border-none border-t xl:border-gray-300">
          <div className="xl:mt-0 mt-3 flex items-center  justify-between">
            <div className="xl:block hidden w-[1px] h-[40px] mx-[20px]  bg-gray-300"></div>
            <div className="flex items-center justify-between flex-1">
              <AiOutlineTag size={20} />
              <div className=" w-[1px] h-[40px] mx-[20px]  bg-gray-300"></div>
              <div
                onClick={handleClick}
                className={`text-[20px] cursor-pointer  ${
                  isBlue ? "text-blue-500 font-semibold" : "text-black"
                }`}>
                $
              </div>
              <div className=" w-[1px] h-[40px] mx-[20px]  bg-gray-300"></div>
            </div>

            {manualTime && (
              <div className="flex gap-[10px] items-center mr-[10px]">
                <input
                  // className="w-[60px] overflow-x-scroll"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-[100px] border border-gray-300 p-[5px] text-sm rounded-md focus:outline-none focus:border-blue-400"
                />

                <span>to</span>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-[100px]  border border-gray-300 p-[5px] text-sm rounded-md focus:outline-none focus:border-blue-400"
                />
              </div>
            )}

            <div className="flex gap-[20px] items-center">
              <div className="font-semibold text-center text-[22px] ">
                {formatTime(time)}
              </div>
              <div className="flex gap-[10px] items-center">
                {manualTime ? (
                  <button
                    onClick={registerReport}
                    className={`bg-blue-400 hover:bg-blue-500 text-white xl:py-[10px] py-[5px] xl:px-[25px] px-[15px] `}>
                    Add
                  </button>
                ) : (
                  <button
                    onClick={startStopwatch}
                    className={`bg-blue-400 hover:bg-blue-500 text-white xl:py-[10px] py-[5px] xl:px-[25px] px-[15px] ${
                      isRunning && "bg-red-600 hover:bg-red-700"
                    }`}>
                    {isRunning ? "Stop" : "Start"}
                  </button>
                )}
                {showManual && (
                  <div className="flex flex-col lg:gap-[10px] gap-[5px] ">
                    <CiTimer
                      onClick={() => {
                        setManualTime(false);
                        clearInterval(intervalRef.current);
                        setTime(0);
                      }}
                      className="cursor-pointer  hover:text-blue-500 "
                    />
                    <RxHamburgerMenu
                      onClick={() => {
                        setManualTime(true);
                        clearInterval(intervalRef.current);
                        setTime(0);
                      }}
                      className="cursor-pointer  hover:text-blue-500 "
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[30px] ">
        <div>
          {Object.entries(groupedReports)

            .sort()
            .reverse()
            .map(([date, projects]) => {
              const formattedDate = formatDate(date);
              return (
                <div key={date}>
                  <div className="mb-[20px] font-bold ml-[5px]">
                    {formattedDate}
                  </div>
                  {Object.entries(projects)
                    .reverse()
                    .map(([projectAndTask, group]) => (
                      <div
                        key={projectAndTask}
                        className="  mb-[20px] border-b-[8px] border-gray-300">
                        <div className="bg-gray-300 px-[15px] py-[10px] text-gray-800 flex justify-between items-center gap-[30px]">
                          <div className="flex gap-[10px] items-center">
                            <Box
                              color={group.reports[0].project.statuscolor}
                              className="font-bold">
                              {projectAndTask}
                            </Box>
                          </div>

                          {group.totalProjectTime > 0 && (
                            <div className="flex items-center gap-[5px]">
                              <span className="align-super"> Total</span>
                              <Box className="font-semibold text-[20px] ">
                                {formatTime(group.totalProjectTime)}
                              </Box>
                            </div>
                          )}
                          {group.totalTaskTime > 0 && (
                            <div className="flex items-center gap-[5px]">
                              <span> Total</span>
                              <Box className="font-semibold text-[20px] ">
                                {formatTime(group.totalTaskTime)}
                              </Box>
                            </div>
                          )}
                        </div>
                        <div className="relative bg-white overflow-x-auto sm:rounded-lg">
                          <div className="">
                            {group.reports
                              .slice()
                              .reverse()
                              .map((report) => (
                                <TrackerItem
                                  key={report.id}
                                  report={report}
                                  addPreviousReport={addPreviousReport}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Tracker;
