import React, { useState, useEffect } from "react";
import { Select, Box } from "@chakra-ui/react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { reportAction } from "../../Store";
import { formatTime } from "../Tracker/tracker";
import MyChart from "./ChatOption";
import PieChart from "./pieChart";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const reports = useSelector((state) => state.report.reports);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [totalTime, setTotalTime] = useState("");
  const [topPro, setTopProject] = useState("");
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const totaltime = (time) => {
    setTotalTime(formatTime(time));
  };
  const topProject = (project) => {
    setTopProject(project);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reporting/${user.id}/trackings`)
      .then((res) => {
        dispatch(reportAction.addReports(res.data));
      })
      .catch((error) => {});
  }, []);

  const toggleShowDateSelector = () => {
    setShowDateSelector(!showDateSelector);
  };

  useEffect(() => {
    //Filter the Reports Array by Date Range:
    const filteredReports = reports.filter((report) => {
      const reportDate = new Date(report.Date);
      const startDate = new Date(state[0].startDate);
      const endDate = new Date(state[0].endDate);
      const reportDateOnly = new Date(
        reportDate.getFullYear(),
        reportDate.getMonth(),
        reportDate.getDate()
      );
      const startDateOnly = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const endDateOnly = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      );

      return reportDateOnly >= startDateOnly && reportDateOnly <= endDateOnly;
    });

    // Initialize an object to group reports by date
    const groupedReports = {};

    // Loop through the filtered reports and group them by date
    filteredReports.forEach((report) => {
      const reportDate = new Date(report.Date);
      const reportDateOnly = new Date(
        reportDate.getFullYear(),
        reportDate.getMonth(),
        reportDate.getDate()
      );

      // Check if the date is already a key in the groupedReports object
      if (!groupedReports[reportDateOnly.toISOString()]) {
        groupedReports[reportDateOnly.toISOString()] = [];
      }

      // Add the report to the corresponding date
      groupedReports[reportDateOnly.toISOString()].push(report);
    });

    // Initialize an object to store total time spent and reports for each day
    const totalTimespentThisDay = {};
    for (const date in groupedReports) {
      const reports = groupedReports[date];
      const totaltime = reports.reduce((total, report) => {
        return total + report.totaltime;
      }, 0);
      const dateInfo = {
        reports: reports,
        totaltimespentthisday: totaltime,
      };

      totalTimespentThisDay[date] = dateInfo;
    }
    setGraphData(totalTimespentThisDay);
  }, [reports, state]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-[20px]  justify-between">
        <div className="flex items-center flex-1 justify-between gap-[20px] ">
          <div className="text-[1.614rem] text-[#666]">Dashboard</div>
          <div className="">
            <Select bg="white">
              <option value="project">Project</option>
              <option value="billability">Billability</option>
            </Select>
          </div>
        </div>
        <div className="flex justify-between items-center gap-[20px]">
          <div>
            <Select bg="white">
              <option value="onlyme">Only me</option>
              <option value="team">Team</option>
            </Select>
          </div>
          <Box position="relative">
            <Box
              onClick={toggleShowDateSelector}
              className="bg-white py-[6px] border rounded-md px-[10px] cursor-pointer border-gray-200">
              {state[0].startDate && state[0].endDate
                ? `${
                    state[0].startDate
                      ? state[0].startDate.toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })
                      : ""
                  }
                            -
                         ${
                           state[0].endDate
                             ? state[0].endDate.toLocaleDateString(undefined, {
                                 month: "short",
                                 day: "numeric",
                               })
                             : ""
                         }`
                : "Select Date"}
            </Box>
            {showDateSelector && (
              <div className="absolute top-[50px] right-0 z-10">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setState([item.selection]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  maxDate={new Date()}
                />
              </div>
            )}
          </Box>
        </div>
      </div>
      <div className="mt-[30px] border border-gray-400 ">
        <div className="flex flex-col md:flex-row bg-gray-300 justify-between ">
          <div className="flex flex-1 flex-col gap-[10px] items-center justify-center md:border-r border-b border-gray-400  p-[30px]">
            <div>Total Time</div>
            <div className="font-semibold text-[20px]">
              {totalTime ? totalTime : "--"}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px] items-center justify-center md:border-r border-gray-400 border-b  p-[30px]">
            <div>Top Project</div>
            <div className="font-semibold text-[20px]">
              {topPro ? topPro : "--"}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px] items-center justify-center  p-[30px]">
            <div>Top Client</div>
            <div>--</div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className=" ">
            <MyChart data={graphData} />
          </div>
          <div className=" border-t border-gray-400 w-full "></div>
          <div className=" mt-[30px]  ">
            <PieChart
              data={graphData}
              totaltime={totaltime}
              topProject={topProject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
