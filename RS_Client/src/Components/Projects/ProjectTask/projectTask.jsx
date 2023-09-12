import { Tr, Td, Box, useOutsideClick, useToast } from "@chakra-ui/react";
import { IoMdDoneAll } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router";
import { taskAction } from "../../../Store";

function ProjectTask(props) {
  const members = useSelector((state) => state.member.members);
  const item = props.task;
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const assignMenuRef = React.useRef();
  const optionsMenuRef = React.useRef();
  const [showoptions, setShowoptions] = useState(false);
  const [showassign, setshowassign] = useState(false);
  const { id } = useParams();

  const [selectedMembers, setSelectedMembers] = useState(
    item.userToAssign ? item.userToAssign.map((item) => item.id) : []
  );
  const showOption = () => {
    setShowoptions(!showoptions);
  };

  const showAssign = () => {
    setshowassign(!showoptions);
  };
  useOutsideClick({
    ref: assignMenuRef,
    handler: () => {
      setshowassign(false);
    },
  });

  useOutsideClick({
    ref: optionsMenuRef,
    handler: () => {
      setShowoptions(false);
    },
  });

  const handleToggleMemberSelect = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleShowSelectedMembers = (userId, taskId) => {
    setshowassign(false);
    const data = {
      userId,
      taskId,
      members: selectedMembers,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/projects/tasks/assign-task`, data)
      .then((res) => {
        toast({
          position: "top-right",
          title: `Task assign`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        axios
          .get(`${process.env.REACT_APP_API_URL}/projects/tasks/${id}/tasks`)
          .then((res) => {
            dispatch(taskAction.addTasks(res.data));
          });
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

  return (
    <Tr key={item.id}>
      <Td>{item.name}</Td>
      <Td>
        <Box
          onClick={showAssign}
          className="inline-flex p-1 cursor-pointer rounded-sm text-[14px] text-black hover:text-white items-center gap-[10px] bg-blue-300 hover:bg-blue-400 ">
          {item.userToAssign.length > 0
            ? item.userToAssign.map((item) => {
                return item.email.concat(", ");
              })
            : "Anyone"}
          <AiFillCaretDown />
        </Box>
        {showassign && (
          <Box
            ref={assignMenuRef}
            className="absolute z-50 bg-white shadow-md p-4 mt-[20px]">
            <Box>
              <input className="w-full border hover:border-gray-600 border-gray-300  outline-none p-1" />
            </Box>
            <Box>
              <Box>
                {members && members.length > 0 && (
                  <Box className="text-gray-400  text-[14px]">USERS</Box>
                )}
                {members &&
                  members.map((member) => {
                    return (
                      <Box
                        key={member.id}
                        className="flex gap-[10px] items-center  mt-[10px] ">
                        <Box>
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => handleToggleMemberSelect(member.id)}
                            className="p-1"
                          />
                        </Box>
                        <Box>{member.email}</Box>
                      </Box>
                    );
                  })}
                {members && members.length > 0 && (
                  <button
                    className="bg-blue-400 py-1 mt-[10px] rounded-md text-white px-[4px]"
                    onClick={() => {
                      handleShowSelectedMembers(user.id, item.id);
                    }}>
                    ASSIGN
                  </button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Td>
      <Td>
        <div className=" flex items-center gap-[30px] justify-end ">
          <div className=" w-[1px] h-[30px] bg-gray-300"></div>
          <div
            onClick={showOption}
            className="relative cursor-pointer hover:text-blue-400">
            {<IoMdDoneAll size={22} />}
          </div>
          {showoptions && (
            <div
              ref={optionsMenuRef}
              className="absolute mt-[60px] right-[30px]  bg-white shadow-lg">
              <div className="px-3 py-2 hover:bg-gray-300 text-[14px]">
                Mark as Done
              </div>
            </div>
          )}
        </div>
      </Td>
    </Tr>
  );
}

export default ProjectTask;
