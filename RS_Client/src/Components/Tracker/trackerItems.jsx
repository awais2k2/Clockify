import { useToast, Box, Input } from "@chakra-ui/react";
import { AiOutlineTag, AiTwotoneDelete } from "react-icons/ai";
import { useState } from "react";
import { BsPlay } from "react-icons/bs";
import axios from "axios";
import { reportAction } from "../../Store";
import { useDispatch, useSelector } from "react-redux";

function TrackerItem(props) {
  const user = useSelector((state) => state.user.user);
  const report = props.report;
  const [disValue, setDisValue] = useState(report.discription);
  const dispatch = useDispatch();
  const toast = useToast();

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const deleteReport = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/reporting`, { data: { id } })
      .then(() => {
        toast({
          position: "top-right",
          title: "Report has been deleted",
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
      .catch((err) => {});
  };
  const addAgain = (report) => {
    props.addPreviousReport(report);
  };

  const handleBlur = (report) => {
    if (disValue === report.discription) {
      return;
    }
    const data = {
      id: report.id,
      dis: disValue,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/reporting/dis`, data)
      .then(() => {
        toast({
          position: "top-right",
          title: "Report update succesfully",
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
      });
  };

  const addBillable = (report) => {
    console.log(report.isbillable);
    const data = {
      id: report.id,
      billable: !report.isbillable,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/reporting/billable`, data)
      .then(() => {
        toast({
          position: "top-right",
          title: "Report update succesfully",
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
      });
  };

  return (
    <div
      key={report.id}
      className="border-b border-gray-200 flex justify-between items-center gap-[30px]">
      <div className="px-6 py-4">
        <Input
          onBlur={() => {
            handleBlur(report);
          }}
          minW="150px"
          value={disValue}
          onChange={(e) => {
            setDisValue(e.target.value);
          }}
          placeholder={report.discription}
        />
      </div>
      <div className="px-6 py-4">
        <Box display="flex" alignItems="center" gap="5px">
          <Box h={2} w={2} rounded="full" bg={report.project.statuscolor}></Box>
          <Box color={report.project.statuscolor} fontWeight="semibold">
            {report.project.name}
          </Box>
          <span className="text-gray-400 whitespace-nowrap">
            {report.task ? `-${report.task.name}` : ""}
          </span>
        </Box>
      </div>
      <div className="px-6 py-4">
        <div
          className={`flex items-center justify-between flex-1 ${
            !report.task && "ml-[90px]"
          }`}>
          <AiOutlineTag size={20} />
          <div className=" w-[1px] h-[40px] mx-[20px]  bg-gray-300"></div>
          <div
            onClick={() => {
              addBillable(report);
            }}
            className={`text-[20px] cursor-pointer  ${
              report.isbillable ? "text-blue-500 font-semibold" : "text-black"
            }`}>
            $
          </div>
          <div className=" w-[1px] h-[40px] mx-[20px]  bg-gray-300"></div>
        </div>
      </div>
      <div className="px-6 py-4 whitespace-nowrap">
        {report.starttime} - {report.endtime}
      </div>
      <div className="px-6 py-4">{formatTime(report.totaltime)}</div>
      <div className="px-6 py-4">
        <BsPlay
          onClick={() => {
            addAgain(report);
          }}
          size={32}
          className="text-blue-300 hover:text-blue-400 cursor-pointer "
        />
      </div>
      <div className="px-6 py-4">
        <AiTwotoneDelete
          onClick={() => {
            deleteReport(report.id);
          }}
          size={20}
          className="hover:text-red-500 cursor-pointer font-bold"
        />
      </div>
    </div>
  );
}

export default TrackerItem;
